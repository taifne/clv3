import React, { useState, useEffect, useRef } from 'react';
import LetterAvatar from './Avatar/LetterAvatar';

type User = {
    id: number;
    username: string;
    email: string;
    createdAt: string;
};

interface UserProps {
    user: User;
    onUserClick: (userId: number) => void;
    highlight: boolean
}

const UserComponent: React.FC<UserProps> = ({ user, onUserClick ,highlight}) => {
    const [highlighted, setHighlighted] = useState(highlight);
    const circleRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setHighlighted(!highlighted);
        onUserClick(user.id);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (circleRef.current && !circleRef.current.contains(event.target as Node)) {
                setHighlighted(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="m-2 relative">
            <div
                ref={circleRef}
                className={`h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer transition-transform duration-300 transform ${highlighted ? 'ring-2 ring-yellow-400 scale-110' : ''}`}
                onClick={handleClick}
            >
                <LetterAvatar label={user.username} size={44} />
            </div>
        </div>
    );
};

export default UserComponent;
