"use client"

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import styles from './Pagination.module.css';
import {clsx} from "clsx";

const PREV_PAGE = 'PREV';
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const NEXT_PAGE = 'NEXT';

const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i += step;
    }
    return range;
};

const fetchPageNumbers = (currentPage: number, totalPage: number, pageNeighbours: number) => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPage > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPage - 1, currentPage + pageNeighbours);

        let pages: Array<typeof PREV_PAGE | typeof LEFT_PAGE | typeof RIGHT_PAGE | typeof NEXT_PAGE | number> = range(startPage, endPage);

        /**
         * hasLeftSpill: has hidden pages to the left
         * hasRightSpill: has hidden pages to the right
         * spillOffset: number of hidden pages either to the left or to the right
         */
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPage - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill):
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;

            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill):
                const extraPagesMore = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPagesMore, RIGHT_PAGE];
                break;

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            }
        }
        return [PREV_PAGE, 1, ...pages, totalPage, NEXT_PAGE];
    }
    return [PREV_PAGE, ...range(1, totalPage), NEXT_PAGE];
};

interface PaginationProps {
    page?: number;
    totalPage: number;
    pageNeighbours?: number;
}
export const Pagination = ({page, totalPage, pageNeighbours = 2}: PaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(page || searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (!totalPage || totalPage === 1) {
        return null;
    }

    const pages = fetchPageNumbers(currentPage, totalPage, pageNeighbours);

    return (
        <nav>
            <ul className={styles.pagination}>
                {pages.map((page, index) => {
                    if (page === PREV_PAGE) return (
                        <li key={index} className={clsx(styles.pagination__item, currentPage <= 1 && styles.disabled)}>
                            <Link
                                className={clsx(styles.pagination__link)}
                                href={createPageURL(currentPage - 1)}
                                aria-label="Previous"
                                title={`Page ${currentPage - 1}`}
                            >
                                Previous
                            </Link>
                        </li>
                    );

                    if (page === LEFT_PAGE) {
                        const value = pages[3];
                        let jumpToPage = typeof value === 'number' ? Math.floor(value / 2) : 1;
                        if (jumpToPage <= 1) {
                            jumpToPage = 2;
                        }
                        return (
                            <li key={index} className={clsx(styles.pagination__item)}>
                                <Link
                                    className={clsx(styles.pagination__link)}
                                    href={createPageURL(jumpToPage)}
                                    aria-label="Jump to page"
                                    title={`Page ${jumpToPage}`}
                                >
                                    ...
                                </Link>
                            </li>
                        );
                    }

                    if (page === RIGHT_PAGE) {
                        const value = pages[pages.length - 4];
                        let jumpToPage = typeof value === 'number' ? (value + Math.floor((totalPage - value) / 2)) : totalPage;
                        if (jumpToPage >= totalPage) {
                            jumpToPage = totalPage - 1;
                        }
                        return (
                            <li key={index} className={clsx(styles.pagination__item)}>
                                <Link
                                    className={clsx(styles.pagination__link)}
                                    href={createPageURL(jumpToPage)}
                                    aria-label="Jump to page"
                                    title={`Page ${jumpToPage}`}
                                >
                                    ...
                                </Link>
                            </li>
                        );
                    }

                    if (page === NEXT_PAGE) return (
                        <li key={index} className={clsx(styles.pagination__item, currentPage >= totalPage && styles.disabled)}>
                            <Link
                                className={clsx(styles.pagination__link)}
                                href={createPageURL(currentPage + 1)}
                                aria-label="Next"
                                title={`Page ${currentPage + 1}`}
                            >
                                Next
                            </Link>
                        </li>
                    );

                    return (
                        <li key={index} className={clsx(styles.pagination__item, currentPage === page && styles.active)}>
                            <Link className={styles.pagination__link} href={createPageURL(page)}>
                                {page}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}