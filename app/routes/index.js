import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router';

// ----------- Pages Imports ---------------
import Dashboard from './Dashboards/Dashboard';

import NavbarOnly from './Layouts/NavbarOnly';
import NavProfile from '../layout/components/NavProfile';
import ParticipantNavBar from './Layouts/ParticipantNavBar';

import ReCharts from './Graphs/ReCharts';

import DatePicker from './Forms/DatePicker';
import Dropzone from './Forms/Dropzone';
import ParticipantDropzone from './Forms/Dropzone/ParticipantsDropzone';
import CreateCampaign from './Forms/CreateCampaign';
import CampaignField from './Pages/Campaign';
import CampaignPageEditor from './Forms/CampaignPageEditor';
import Email from './Pages/Email';
import NotificationTemplateForm from './Forms/EditEmailTemplate';
import CampaignSettings from './Forms/SystemOptions';
import EditParticipant from './Forms/EditParticipant';
import ManageParticipantList from './Pages/Participant';
import ParticipantDetails from './Pages/ParticipantDetails';
import ManageCustomerList from './Pages/Customer';
import Webhook from "./Pages/Webhook";
import Logout from "./Pages/Logout";
import ParticipantLogout from "./Pages/ParticipantLogout";
import ManageRewardList from "./Pages/Reward";
import ParticipantPayout from "./Pages/ParticipantPayout";
import ParticipantCommision from "./Pages/ParticipantCommision";
import ManageCommissionList from './Pages/Commission';
import File from "./Pages/Settings/Files";
import secretKey from "./Pages/Settings/SecretKey";
import ReferralLogin from "./Pages/ReferralLogin/ReferralLogin";
import ReferralNewPassword from "./Pages/ReferralNewPassword";

import Tables from './Tables/Tables';
import ExtendedTable from './Tables/ExtendedTable';

import ComingSoon from './Pages/ComingSoon';
import Confirmation from './Pages/Confirmation';
import Danger from './Pages/Danger';
import Error404 from './Pages/Error404';
import ForgotPassword from './Pages/ForgotPassword';
import LockScreen from './Pages/LockScreen';
import Login from './Pages/Login/Login';
import Register from './Pages/Register';
import setupAdmin from './Pages/Setup';
import referralSignup from './Pages/ReferralSignup';
import ReferralReset from './Pages/ReferralReset';
import Success from './Pages/Success';
import Timeline from './Pages/Timeline';

import Icons from './Icons';

// ----------- Layout Imports ---------------
import DefaultNavbar from './../layout/components/DefaultNavbar';
import { DefaultSidebar } from './../layout/components/DefaultSidebar';

import { SidebarANavbar } from './../layout/components/SidebarANavbar';
import { SidebarASidebar } from './../layout/components/SidebarASidebar';
import { store } from "../store";
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import port from '../port';
import Fetcher from '../utilities/fetcher';

let initializedState = async function(dispatch){
    let initialState = {
        allForms : {},
        options: {},
        notifications: [],
        system_notifications: [],
        user: [],
        uid : Cookies.get("uid")
    };
    initialState.options = await Fetcher(`${port}/api/v1/system-options/public`);
    try {
        if (Cookies.get("uid")) { // if user is logged in
            initialState.user = (await Fetcher(`${port}/api/v1/users/own`))[0];
            initialState.notifications = await Fetcher(`${port}/api/v1/notifications/own`);
        }
    }
    catch(err){

    }
    return dispatch(initializeState(initialState));
};

store.dispatch(initializedState);

store.subscribe(()=>{
    // console.log("store changed", store.getState());
});

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export const RoutedContent = () => {
    return (
        <Provider store={store}>
            <Switch>
                <Redirect from="/" to="/dashboard" exact />

                <Route path="/dashboard" exact component={Dashboard} />

                { /*    Layouts     */}
                <Route path='/layouts/navbar' component={NavbarOnly} />
                <Route path='*user/profile' component={NavProfile} />


                { /*    Forms Routes    */}
                <Route component={DatePicker} path="/forms/date-picker" />
                <Route component={Dropzone} path="/assets" />
                <Route component={CreateCampaign} path="/create-campaign" />
                <Route component={CreateCampaign} path="/edit-campaign" />
                <Route component={CampaignPageEditor} path="/edit-campaign-page" />
                <Route component={Email} path="/notifications-templates" />
                <Route component={CampaignField} path="/campaign" />
                <Route component={NotificationTemplateForm} path="/edit-template/:id" />
                <Route component={CampaignSettings} path="/campaign-settings/:id" />
                <Route component={ManageParticipantList} path="/participants" />
                <Route component={ManageCustomerList} path="/customers" />
                <Route component={ParticipantDetails} path="/my-dashboard" />
                <Route component={EditParticipant} path="/edit-participant/:id" />
                <Route component={ParticipantDropzone} path="/profile/assets"/>
                <Route component={Webhook} path="/webhook" />
                <Route component={Logout} path="/logout" />
                <Route component={ParticipantLogout} path="/:campaignName/logout"/>
                <Route component={ManageRewardList} path="/payouts" />
                <Route component={ParticipantPayout} path="/profile/payouts" />
                <Route component={ParticipantCommision} path="/profile/commissions" />
                <Route component={ManageCommissionList} path="/commissions" />
                <Route component={File} path="/logo" />
                <Route component={secretKey} path="/settings" />



                { /*    Graphs Routes   */}
                <Route component={ReCharts} path="/graphs/re-charts" />

                { /*    Tables Routes   */}
                <Route component={Tables} path="/tables/tables" />
                <Route component={ExtendedTable} path="/tables/extended-table" />

                { /*    Pages Routes    */}
                <Route component={ComingSoon} path="/pages/coming-soon" />
                <Route component={Confirmation} path="/pages/confirmation" />
                <Route component={Danger} path="/pages/danger" />
                <Route component={Error404} path="/pages/error-404" />
                <Route component={ForgotPassword} path="/pages/forgot-password" />
                <Route component={LockScreen} path="/pages/lock-screen" />
                <Route component={Login} path="/login" />
                <Redirect from="/pub/:campaignName" to="/:campaignName/login" exact />
                <Route component={ReferralLogin} path="/:campaignName/login" />
                <Route component={Register} path="/pages/register" />
                <Route component={setupAdmin} path="/setup" />
                <Route component={referralSignup} path="/:campaignName/signup" />
                <Route name="Finish Your Registration" path="/:campaignName/invitation/:token" component={referralSignup}/>
                <Route component={ReferralReset} path="/:campaignName/forgot-password" />
                <Route component={ReferralNewPassword} path="reset-password/:pid/:token" />
                <Route component={Success} path="/pages/success" />
                <Route component={Timeline} path="/pages/timeline" />

                <Route path='/icons' exact component={Icons} />

                { /*    404    */}
                <Redirect to="/pages/error-404" />
            </Switch>
        </Provider>
        
    );
};

//------ Custom Layout Parts --------
export const RoutedNavbars  = () => (
    <Switch>
        { /* Other Navbars: */}
        <Route
            component={ SidebarANavbar }
            path="/layouts/sidebar-a"
        />
        <Route
            component={ NavbarOnly.Navbar }
            path="/layouts/navbar"
        />
        { /* Default Navbar: */}
        <Route
            component={ DefaultNavbar }
        />
    </Switch>  
);

export const RoutedSidebars = () => (
    <Switch>
        { /* Other Sidebars: */}
        <Route
            component={ SidebarASidebar }
            path="/layouts/sidebar-a"
        />
        { /* Default Sidebar: */}
        <Route
            component={ DefaultSidebar }
        />
    </Switch>
);
