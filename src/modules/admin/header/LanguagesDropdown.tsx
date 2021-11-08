import React, { useEffect, useRef, useState } from 'react'

interface Language{
    key:string;
    icon:string;
    label:string;
}

const languages:Language[] = [
    {
        key: 'en',
        icon: 'flag-icon-us',
        label: 'header.language.english'
    },
    {
        key: 'es',
        icon: 'flag-icon-es',
        label: 'header.language.spanish'
    },
    {
        key: 'tr',
        icon: 'flag-icon-tr',
        label: 'header.language.turkish'
    },
    {
        key: 'de',
        icon: 'flag-icon-de',
        label: 'header.language.german'
    },
    {
        key: 'fr',
        icon: 'flag-icon-fr',
        label: 'header.language.french'
    },
];

function LanguagesDropdown() {
    const dropdownRef = useRef(null);

    const [language, setLanguage] = useState<string>('en');
    const [dropdownState, setDropdownState] = useState<boolean>(false);

    const toggleDropdown = () => {
        setDropdownState(!dropdownState);
    };

    const handleClickOutside = (event:any) => {
        // @ts-ignore: Object is possibly 'null'.
        if ( dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target) ) {
            setDropdownState(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, false);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
                false
            );
        };
    });

    let className = 'dropdown-menu dropdown-menu-right p-0';

    if (dropdownState) {
        className += ' show';
    }

    const changeLanguage = (lng:string) => {
        setLanguage(lng);
    };

    const getCurrentLanguage = () => {
        return languages.find(
            (lng) => lng.key === language
        );
    };

    const isActiveLanguage = (lng:Language) => {
        if (lng) {
            return language === lng.key ? 'active' : '';
        }
        return '';
    };

    return (
        <li
            ref={dropdownRef}
            className="nav-item d-none d-sm-inline-block dropdown"
        >
            <button onClick={toggleDropdown} type="button" className="nav-link">
                <i className={`flag-icon ${getCurrentLanguage()?.icon}`} />
            </button>
            <div className={className}>
                {languages.map((language) => (
                    <button 
                        key={language.key}
                        type="button"
                        className={`dropdown-item ${isActiveLanguage(
                            language
                        )}`}
                        onClick={() => {
                            changeLanguage(language.key);
                            setDropdownState(false);
                        }}
                    >
                        <i className={`flag-icon ${language.icon} mr-2`} />
                        <span>{language.label}</span>
                    </button>
                ))}
            </div>
        </li>
    )
}

export default LanguagesDropdown
