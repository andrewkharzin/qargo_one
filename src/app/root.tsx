// app/root.tsx
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/app/globals.css'; // Импортируем глобальные стили

const geistSans = localFont({ // Конфигурация шрифтовых файлов
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});

const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Next.js Note App', // Метаданные заголовка
    description: 'An application for managing notes built with Next.js.'
};

const RootLayout = ({
    children
}: {
    children: ReactNode;
}) => {
    return (
        <html lang="en">
            <head />
            <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
        </html>
    );
};

export default RootLayout;
