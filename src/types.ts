export type TSearchPageForm = {
    phrase: string;
    yearStart: Date | undefined;
    yearEnd: Date | undefined;
};

type TSearchLink = {
    href: string;
    prompt: string;
    rel: string;
};

type TSearchItemLink = {
    href: string;
    rel: string;
    render: string;
};

type TSearchItemData = {
    nasa_id: string;
    title: string;
    date_created: string;
    description: string;
    location: string;
    photographer: string;
};
type TSearchItem = {
    data: TSearchItemData[];
    href: string;
    links: TSearchItemLink[];
};

export type TSearchResult = {
    href: string;
    items: TSearchItem[]; // too comple
    links: TSearchLink[];
    metadata: {
        total_hits: number;
    };
    version: string;
};

export type TSingleSearchResult = {
    href: string;
    items: TSearchItem[];
    metadata: {
        total_hits: number;
    };
    version: string;
};

type THandleSetPage = {
    currentPage: number;
    previousPage: number;
};

export type TPagination = {
    handlePageChange: (action: string) => void;
    handleSetPage: ({ currentPage, previousPage }: THandleSetPage) => void;
    totalData: number;
    itemsPerPage: number;
    page: {
        currentPage: number;
        previousPage: number;
    };
};

export type TSearchPageCard = {
    nasa_id: string;
    thumbnail: string;
    title: string;
    location: string;
    photographer: string;
};

export type TChildren = {
    children: React.ReactNode;
};

export type SVGProps = {
    color?: string;
    width?: string;
    height?: string;
};

type TErrors = {
    phrase: {
        message: string;
    };
    ref: () => void;
    type: string | number;
};
export type TSearchForm = {
    register: any; // TODO
    onSubmit: () => void;
    name: string;
    yearStart: Date | undefined;
    yearEnd: Date | undefined;
    setYearStart: (date: Date | undefined) => void;
    setYearEnd: (date: Date | undefined) => void;
    errors: TErrors | any;
};
