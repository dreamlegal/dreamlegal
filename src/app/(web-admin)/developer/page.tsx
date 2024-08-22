"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

export default function SqlExecutor() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<any[]>([]); // Change to array of any
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const checkAuth = async () => {
            const id = localStorage.getItem('developerId');

            if (id === '9485f4f4e8485a7773123ef7fd76fee9') {
                setIsAuthenticated(true);
            }
        };
        checkAuth();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);
        setResult([]);

        try {
            const response = await fetch('/api/execute-sql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.result);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Error executing query');
        }
    };

    if (!isAuthenticated) {
        return <p>Access Denied</p>;
    }

    const renderTable = () => {
        if (result.length === 0) {
            return <p>No results found</p>;
        }

        const keys = Object.keys(result[0]); // Get keys from the first object

        return (
            <table className='min-w-full border-collapse border border-gray-200'>
                <thead>
                    <tr>
                        {keys.map((key) => (
                            <th key={key} className='border border-gray-300 px-4 py-2'>
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {result.map((row, index) => (
                        <tr key={index}>
                            {keys.map((key) => (
                                <td key={key} className='border border-gray-300 px-4 py-2'>
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <h1>SQL Executor</h1>
            <form onSubmit={handleSubmit}>
                <Textarea
                    rows={10}
                    cols={60}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter SQL query here"
                />
                <br />
                <button className='px-4 py-2 bg-black text-white rounded' type="submit">Execute</button>
            </form>
            {result.length > 0 ? (
                <div>
                    <h2>Result:</h2>
                    <div >
                        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                            {renderTable()}
                        </ScrollArea>
                    </div>
                </div>
            ) : (
                error && (
                    <div>
                        <h2>Error:</h2>
                        <pre>{error}</pre>
                    </div>
                )
            )}
        </div>
    );
}
