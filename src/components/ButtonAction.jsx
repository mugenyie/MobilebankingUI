export default function ButtonAction({
    className,
    type,
    onClick,
    text,
    icon
  }){
    return(
        <>
        <button
            className={className+` inline-flex gap-2 items-center justify-center bg-black hover:bg-gray-900 font-semibold group relative w-full py-2 px-4 border border-transparent text-sm rounded-md text-white focus:outline-none`}
            onClick={onClick}
        >
            <span>{text}</span>
            {icon}
        </button>
        </>
    )
  }