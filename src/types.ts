export type TSearchPageForm = {
    phrase: string,
    yearStart: Date | undefined,
    yearEnd: Date | undefined
}

type TSearchLink = {
    href: string,
    prompt: string,
    rel: string
}

type TSearchItemLink = {
    href: string,
    rel: string,
    render: string
}

type TSearchItemData = {
    nasa_id: string,
    title: string,
    date_created: string,
    description: string,
    location: string,
    photographer: string
}
type TSearchItem = {
    data: TSearchItemData[]
    href: string,
    links: TSearchItemLink[]
}

export type TSearchResult = {
    href: string,
    items: TSearchItem[], // too comple
    links: TSearchLink[],
    metadata: {
        total_hits: number
    },
    version: string

}

export type TSingleSearchResult = {
    href: string,
    items: TSearchItem[],
    metadata: {
        total_hits: number
    },
    version: string
}