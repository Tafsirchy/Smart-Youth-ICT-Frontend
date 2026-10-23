'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Shared table state for the super admin screens.
 *
 * The branches, curriculum and users screens each hand rolled their own
 * search / filter / sort / pagination logic. This hook holds that state in
 * one place so the screens only keep their own layout code, and the page
 * modules describe their columns in a separate schema module.
 *
 * @param {Object}   options
 * @param {Array}    [options.data]            rows to display
 * @param {Function[]} [options.searchFields]  accessors returning the searchable text of a row
 * @param {Function} [options.filter]          predicate deciding whether a row is shown
 * @param {Object}   [options.initialSort]     { key, direction: 'asc' | 'desc' }
 * @param {number}   [options.pageSize]        rows per page (ignored when `paginate` is false)
 * @param {boolean}  [options.paginate]        show the pagination controls (default true)
 * @param {number}   [options.initialPage]     first page to show (default 1)
 */
export default function useSuperTable({
    data = [],
    searchFields = [],
    filter = null,
    initialSort = null,
    pageSize = 10,
    paginate = true,
    initialPage = 1,
} = {}) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(initialPage);
    const [sort, setSort] = useState(initialSort);

    const filteredRows = useMemo(() => {
        const needle = search.trim().toLowerCase();

        return data.filter((row) => {
            if (filter && !filter(row)) return false;

            if (!needle) return true;

            return searchFields.some((accessor) => {
                const value = typeof accessor === 'function' ? accessor(row) : accessor;
                return String(value ?? '').toLowerCase().includes(needle);
            });
        });
    }, [data, filter, search, searchFields]);

    const sortedRows = useMemo(() => {
        if (!sort?.key) return filteredRows;

        const accessor = sort.accessor || ((row) => row?.[sort.key]);
        const direction = sort.direction === 'desc' ? -1 : 1;

        return [...filteredRows].sort((a, b) => {
            const left = accessor(a);
            const right = accessor(b);

            if (left === right) return 0;
            if (left === undefined || left === null) return 1;
            if (right === undefined || right === null) return -1;

            if (typeof left === 'number' && typeof right === 'number') {
                return (left - right) * direction;
            }

            return String(left).localeCompare(String(right), undefined, { numeric: true }) * direction;
        });
    }, [filteredRows, sort]);

    const totalPages = paginate ? Math.max(1, Math.ceil(sortedRows.length / pageSize)) : 1;

    // A filter or a search that shrinks the result set can leave the page
    // number behind the last page.
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    // Searching starts over on the first page, the way the hand rolled
    // tables behaved before.
    useEffect(() => {
        setPage(initialPage);
    }, [search, initialPage]);

    // The same holds for a changed filter.
    useEffect(() => {
        setPage(initialPage);
    }, [filter, initialPage]);

    const toggleSort = useCallback((key, accessor) => {
        setSort((current) => {
            if (current?.key !== key) return { key, accessor, direction: 'asc' };
            if (current.direction === 'asc') return { key, accessor, direction: 'desc' };
            return null;
        });
    }, []);

    const reset = useCallback(() => {
        setSearch('');
        setPage(initialPage);
        setSort(initialSort);
    }, [initialPage, initialSort]);

    const rows = paginate
        ? sortedRows.slice((page - 1) * pageSize, page * pageSize)
        : sortedRows;

    return {
        search,
        setSearch,
        page,
        setPage,
        pageSize,
        paginate,
        totalPages,
        total: sortedRows.length,
        rows,
        allRows: sortedRows,
        sort,
        setSort,
        toggleSort,
        reset,
    };
}
