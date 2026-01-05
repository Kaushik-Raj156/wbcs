//ThemeToggle.js
import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useGlobalContext } from '../Contexts/globalContext/context';

const Toggle = () => {
    const { theme, setTheme } = useGlobalContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-[22px] h-[22px]"></div>;
    }

    return (
        <div className="transition cursor-pointer hover:text-accent rounded-full">
            {theme === 'dark' ? (
                <SunIcon width={22}
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
            ) : ( 
                    <MoonIcon width={22}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                )}
        </div>
    );
};

export default Toggle;