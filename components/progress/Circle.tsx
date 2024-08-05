import clsx from "clsx"

export const Circle = ({
    checked,
    title,
    error
}: {
    checked: boolean,
    title: string,
    error?: any
}) => {
    return (
        <>
            <div className='flex gap-2 items-center justify-start'>
                    <div className={clsx(
                        "flex justify-center items-center gap-2 rounded-full border p-1",
                        error ? 'border-red-600' : 'border-white'
                    )}>
                        <div className={clsx(
                            'rounded-full w-[20px] flex justify-center items-center h-[20px]',
                                !checked ? 'bg-[#276d82]' : 'border-2 border-[#276d82]'
                        )}>
                                {!checked 
                                        ? <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="12px" fill='white' viewBox="0 0 469.184 469.185"
                                                    >
                                                <g>
                                                    <path d="M462.5,96.193l-21.726-21.726c-8.951-8.95-23.562-8.95-32.59,0L180.368,302.361l-119.34-119.34
                                                        c-8.95-8.951-23.562-8.951-32.589,0L6.712,204.747c-8.95,8.951-8.95,23.562,0,32.589L163.997,394.62
                                                        c4.514,4.514,10.327,6.809,16.218,6.809s11.781-2.295,16.219-6.809L462.27,128.783C471.45,119.68,471.45,105.145,462.5,96.193z"/>
                                                </g>
                                            </svg>
                                        : <div className='w-[5px] h-[5px] rounded-full bg-[#56b9d8]'></div>
                                }
                        </div>
                    </div>
                    <h2 className="hidden lg:block">{title}</h2>
                    </div>
            <div className='w-1/4 lg:w-1 my-1 lg:ml-3 bg-gray-300 rounded-lg h-[2px] lg:h-[10px]'></div>
        </>
    )
}