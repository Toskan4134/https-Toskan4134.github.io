import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { Sun, Moon, Menu } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './sheet';
import logob from '../assets/logob.png';
import logow from '../assets/logow.png';
import { motion } from 'framer-motion';

const Header = ({ theme, setTheme, refs }) => {
    const { startRef, skillsRef, experienceRef, projectsRef, contactRef } =
        refs;

    if (!skillsRef || !experienceRef || !projectsRef || !contactRef) {
        return null;
    }

    function NavLink({ children, onClick, isMenu = false }) {
        return (
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClick}
                className={`cursor-pointer text-left ${
                    isMenu ? 'origin-left' : 'origin-center'
                }`}
            >
                <p className='text-sm font-medium transition-colors'>
                    {children}
                </p>
            </motion.div>
        );
    }

    const navItems = [
        { ref: skillsRef, label: 'Skills' },
        { ref: projectsRef, label: 'Proyectos' },
        { ref: experienceRef, label: 'Experiencia' },
        { ref: contactRef, label: 'Contacto' },
    ];

    return (
        <header className='sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full px-4'>
            <nav className='flex h-14 items-center'>
                <Link
                    className='mr-6 flex items-center space-x-2'
                    onClick={() => {
                        startRef?.scrollIntoView({
                            behavior: 'smooth',
                        });
                    }}
                >
                    <motion.img
                        src={theme === 'dark' ? logow : logob}
                        alt='logo'
                        width={32}
                        height={32}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    />
                </Link>
                <div className='flex flex-1 items-center justify-end space-x-4'>
                    <div className='hidden md:flex space-x-4'>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                onClick={() => {
                                    item.ref?.scrollIntoView({
                                        behavior: 'smooth',
                                    });
                                }}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant='ghost'
                            size='icon'
                            aria-label='Toggle theme'
                            className='w-9 px-0'
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                        >
                            <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                            <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                            <span className='sr-only'>Toggle theme</span>
                        </Button>
                    </motion.div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    className='md:hidden'
                                >
                                    <Menu className='h-5 w-5' />
                                    <span className='sr-only'>Toggle menu</span>
                                </Button>
                            </motion.div>
                        </SheetTrigger>
                        <SheetContent
                            side='right'
                            style={{
                                backgroundColor:
                                    theme === 'dark' ? '#0a0a0a' : '#fff',
                                color: theme === 'dark' ? '#ededed' : '#171717',
                                border: 0,
                            }}
                        >
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className='flex flex-col space-y-4 mt-4'>
                                {navItems.map((item) => (
                                    <SheetClose>
                                        <NavLink
                                            key={item.label}
                                            onClick={() => {
                                                item.ref?.scrollIntoView({
                                                    behavior: 'smooth',
                                                });
                                            }}
                                            isMenu
                                        >
                                            {item.label}
                                        </NavLink>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};

export default Header;
