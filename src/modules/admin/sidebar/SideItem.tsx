import React, { useEffect, useState, FunctionComponent } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link, NavLink, withRouter, RouteComponentProps} from 'react-router-dom';

export interface SideItemInterface{
    id?: any;
    icon?: any;
    text?: string;
    labels?: any;
    color?: string;
    history?: any;
    children?: any;
    activeOn?: any;
    to?: string;
    highlighted?: any;
    toggleMenuSidebar?: any;
}

const isActiveItem = ({link, activeOn, history}:any) => {
    const {location} = history || {};
    const {pathname} = location || {pathname: ''};
    let activeArray = [];
    if (activeOn) {
        activeArray =
            activeOn.length && typeof activeOn !== 'string'
                ? activeOn
                : [activeOn];
    }
    const active =
        pathname === link ||
        !!activeArray.find((p:any) => pathname.match(new RegExp(p)));
    return active;
};

const SideItem: FunctionComponent<SideItemInterface & RouteComponentProps>= (props) => {
    const {
        icon,
        text,
        labels,
        color,
        history,
        children,
        activeOn,
        to,
        highlighted,
        toggleMenuSidebar
    } = props;
    const [activeChild, setActiveChild] = useState(false);
    const localTo = to;
    const active = isActiveItem({link: localTo, activeOn, history});
    const localLabels =
        labels && labels.length ? labels : (labels && [labels]) || [];
    const mappedLabels = localLabels.map((p:any) =>
        p.small ? (
            <small key={uuidv4()} className={`label pull-right bg-${p.color}`}>
                {p.text}
            </small>
        ) : (
            <span key={uuidv4()} className={`label label-${p.type} pull-right`}>
                {p.text}
            </span>
        )
    );

    const hasChildren = !!children;
    const hasLabels = Array.isArray(localLabels);

    const onClickNav = () => {
        setActiveChild(!activeChild);
    };
    
    const actualComponent = (
        <React.Fragment key={uuidv4()}>
            <>
                <FontAwesomeIcon
                    className="nav-icon"
                    icon={icon}
                    style={{marginRight: '6px'}}
                />
                {' '}
                <p>
                    {text}
                    {(hasChildren || hasLabels) && (
                        <>
                            {hasChildren && (
                                <i className="right fas fa-angle-left"></i>
                            )}
                            {hasLabels && mappedLabels}
                        </>
                    )}
                </p>
            </>
        </React.Fragment>
    );

    const liClasses = [
        active ? ' active ' : null,
        hasChildren ? ' ' : null,
        activeChild ? ' menu-is-opening menu-open ' : null,
        highlighted ? ' active' : undefined
    ]
        .filter((p) => p)
        .join(' ');

    useEffect(() => {
        if (hasChildren) {
            let localChildren = children.length ? children : [children];
            localChildren = children.map((p:any) =>
                React.cloneElement(p, {key: p.to})
            );
            const newactiveChild = !!localChildren.find((p:any) =>
                isActiveItem({
                    history,
                    link: p.props.to,
                    ...p.props
                })
            );
            setActiveChild(newactiveChild);
        }
    }, []);
    
    return (
        <li className={`nav-item ${liClasses}`}>
            {
                localTo ? (
                    <NavLink
                        to={localTo}
                        exact
                        className="nav-link"
                        onClick={() => {
                            if(typeof toggleMenuSidebar === 'function'){
                                toggleMenuSidebar();
                            }
                        }}
                    >
                        {actualComponent}
                    </NavLink>
                ) : (
                    // eslint-disable-next-line no-script-url, jsx-a11y/anchor-is-valid
                    <a className="nav-link" href={void 0} onClick={() => onClickNav()}>
                        {actualComponent}
                    </a>
                )
            }
            {
                hasChildren && (
                    <ul
                        className="nav nav-treeview"
                        style={{display: activeChild ? 'block' : 'none'}}
                    >
                        {React.Children.map(children, (child) => {
                            return React.cloneElement(child, {toggleMenuSidebar});
                        })}
                    </ul>
                )
            }
        </li>
    );
}

export default withRouter(SideItem)
