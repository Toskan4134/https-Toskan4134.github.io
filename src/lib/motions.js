export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const staggerChildrenFast = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};
export const staggerChildrenSlow = {
    animate: {
        transition: {
            staggerChildren: 0.17,
        },
    },
};