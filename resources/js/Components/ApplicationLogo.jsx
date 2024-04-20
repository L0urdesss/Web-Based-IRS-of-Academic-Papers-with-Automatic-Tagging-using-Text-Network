import { Link } from '@inertiajs/react';
import LogoImage from '@/Components/logo.png'; // Import your logo image

export default function ApplicationLogo(props) {
    return (
        <div>
            <Link href="/">
                <img src={LogoImage} className="w-auto h-20" alt="Logo" />
            </Link>
        </div>
    );
}
