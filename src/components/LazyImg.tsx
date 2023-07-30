const LazyImg = (img: { thumbnail: string }) => {
    const { thumbnail } = img;
    return (
        <img
            className="h-48 rounded-t-md  aspect-square mb-2 mx-auto flex flex-col justify-center items-center object-cover w-96"
            src={thumbnail}
            alt="item thumbnail"
        />
    )
}

export default LazyImg