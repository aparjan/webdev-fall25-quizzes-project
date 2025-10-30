import Link from "next/link";

export default function Labs() {
    return (
        <div id="wd-labs">
            {/* Student Info */}
            <div className="mt-4 mb-6 text-sm">
                <h4 className="font-bold">Student Info</h4>
                <p><span className="font-semibold">Name:</span> Aparnaa Rajan</p>
                <p><span className="font-semibold">Email:</span> rajan.ap@northeastern.edu</p>
                <p><span className="font-semibold">NUID:</span> 002596961</p>
                <p><span className="font-semibold">Section:</span> CS5610.19730.202610 </p>
            </div>
            <br />
            <br />
            <h1>Labs</h1>
            <ul>
                <li>
                    <Link href="/Labs/Lab1" id="wd-lab1-link">
                        Lab 1: HTML Examples
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab2" id="wd-lab2-link">
                        Lab 2: CSS Basics
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab3" id="wd-lab3-link">
                        Lab 3: JavaScript Fundamentals
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab4" id="wd-lab4-link">
                        Lab 4: Redux Fundamentals
                    </Link>
                </li>
            </ul>
        </div>
    );
}