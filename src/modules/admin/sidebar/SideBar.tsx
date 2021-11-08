import React, { useRef, useState } from 'react';
import {filter, deepMap} from 'react-children-utilities';
import SideItem from './SideItem';
import SideSearchBar from './SideSearchBar';

function SideBar({children, searchbarFilter, toggleMenuSidebar}:any) {
    const [searchValue, setSearchValue] = useState('');

    const onSearchValueChange = (value:any) => {
        setSearchValue(value);
    };

    const widgetReference = useRef(null);

    const flatten:any = (element:any) => {
        if (!element.props) {
            return [];
        }
        const {children: elemChildren, ...otherProps} = element.props;
        const elemWithoutChildren = React.cloneElement(
            element,
            otherProps,
            null
        );
        if (elemChildren) {
            let intermediate;
            if (typeof elemChildren !== 'string' && elemChildren.length) {
                intermediate = elemChildren.map(flatten).flat();
            } else {
                intermediate = flatten(elemChildren);
            }
            intermediate.push(elemWithoutChildren);
            return intermediate;
        }
        return [elemWithoutChildren];
    };

    let localChildren;
    if (children) {
        localChildren = children.length ? children : [children];
    } else {
        localChildren = [];
    }
    if (searchbarFilter) {
        const localSearchbar = localChildren.find((p:any) => p.type === SideSearchBar);
        if (localSearchbar) {
            const index = localChildren.map((p:any) => p.type).indexOf(SideSearchBar);
            const temp = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < localChildren.length; ++i) {
                if (i !== index) {
                    temp.push(localChildren[i]);
                } else {
                    const {onChange, ...tempProps} = localSearchbar.props;
                    temp.push(
                        React.cloneElement(localSearchbar, {
                            onChange: onSearchValueChange,
                            ...tempProps
                        })
                    );
                }
            }
            localChildren = temp;
            if (searchValue.length > 0) {
                const flattenChildren = localChildren
                    .filter((p:any) => p.type === SideItem)
                    .map(flatten)
                    .flat()
                    .filter((p:any) => p.props.to);
                const others = localChildren.filter(
                    (p) => p.type === SideSearchBar
                );
                localChildren = others.concat(
                    flattenChildren.filter(
                        (p:any) =>
                            p.props.text
                                .toUpperCase()
                                .indexOf(searchValue.toUpperCase()) > -1
                    )
                );
            }
        }
    }
    return (
        <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            ref={widgetReference}
        >
            {
                deepMap(filter(localChildren,child=>child!==null),
                (child:any) => {
                    return React.cloneElement(child, {toggleMenuSidebar});
                })
            }
        </ul>
    );
}

export default SideBar
