import React from 'react';

import { SidebarMenu } from './../../components';
import {isAdmin} from '../../utilities/admin';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        {isAdmin() && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Dashboard"
            to='/dashboard'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-industry"></i>}
            title="Campaigns"
            to='/campaign'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-users"></i>}
            title="Participants"
            to='/participants'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-user"></i>}
            title="Customers"
            to='/customers'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-money"></i>}
            title="Commissions"
            to='/commissions'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-credit-card"></i>}
            title="Payouts"
            to='/Payouts'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-envelope-o"></i>}
            title="Emails"
            to='/notifications-templates'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-folder-open-o"></i>}
            title="Assets"
            to='/files'
        ></SidebarMenu.Item>}
        {isAdmin && <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-gear"></i>}
            title="Settings"
            to='/webhook'
        ></SidebarMenu.Item>}
        
        { /* -------- Forms ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-check-square-o"></i>}
            title="Forms"
        >
            <SidebarMenu.Item title="Forms" to='/forms/forms' />
            <SidebarMenu.Item title="Forms Layouts" to='/forms/forms-layouts' />
            <SidebarMenu.Item title="Input Groups" to='/forms/input-groups' />
            <SidebarMenu.Item title="Wizard" to='/forms/wizard' />
            <SidebarMenu.Item title="Text Mask" to='/forms/text-mask' />
            <SidebarMenu.Item title="Typeahead" to='/forms/typeahead' />
            <SidebarMenu.Item title="Toggles" to='/forms/toggles' />
            <SidebarMenu.Item title="Editor" to='/forms/editor' />
            <SidebarMenu.Item title="Date Picker" to='/forms/date-picker' />
            <SidebarMenu.Item title="Dropzone" to='/forms/dropzone' />
            <SidebarMenu.Item title="Sliders" to='/forms/sliders' />
        </SidebarMenu.Item>
        
        { /* -------- Pages ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-copy"></i>}
            title="Pages"
        >
            <SidebarMenu.Item title="Register" to="/pages/register" />
            <SidebarMenu.Item title="Login" to="/pages/login" />
            <SidebarMenu.Item title="Forgot Password" to="/pages/forgot-password" />
            <SidebarMenu.Item title="Lock Screen" to="/pages/lock-screen" />
            <SidebarMenu.Item title="Error 404" to="/pages/error-404" />
            <SidebarMenu.Item title="Confirmation" to="/pages/confirmation" />
            <SidebarMenu.Item title="Success" to="/pages/success" />
            <SidebarMenu.Item title="Danger" to="/pages/danger" />
            <SidebarMenu.Item title="Coming Soon" to="/pages/coming-soon" />
            <SidebarMenu.Item title="Timeline" to="/pages/timeline" />
        </SidebarMenu.Item>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-star-o"></i>}
            title="Icons"
            to='/icons'
        />
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-bookmark-o"></i>}
            title="Docs"
            href='#'
        />
    </SidebarMenu >
);
