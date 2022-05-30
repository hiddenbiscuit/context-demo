import Link from 'next/link';

export default function () {
    return (
        <div className="flex flex-row gap-5 justify-evenly h-screen items-center font-bold">
            <Link passHref href='/bad' className=''><div className="cursor-pointer p-5 hover:bg-gray-200 border rounded">Bad Example</div></Link>
            <Link passHref href='/good' className=''><div className="cursor-pointer p-5 hover:bg-gray-200 border rounded">Good Example</div></Link>
        </div>
    )
}