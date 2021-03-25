import React from 'react';

import { SidebarMenu } from './../../components';
import {isAdmin, isParticipant} from '../../utilities/admin';

export class SidebarMiddleNav extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            participant: false,
            loading : true
        }
        this.checkProfile = this.checkProfile.bind(this);
        this.checkParticipant = this.checkParticipant.bind(this);
    }

    async componentDidMount(){
        //console.log(isAdmin);
        await this.checkProfile();
        await this.checkParticipant();
    }

    async checkProfile(){
        let self = this;
        console.log(await isAdmin());
        if(await isAdmin()){
            self.setState({admin: true, loading: false});
        }
    }

    async checkParticipant(){
        let self = this;
        if(await isParticipant()){
            self.setState({participant: true, loading: false});
        }
    }

    render(){
        if(this.state.loading){
            return(
                <div><p>Loading</p></div>
            )
        }else{
            if(this.state.admin){
                return(
                    <SidebarMenu>
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-home"></i>}
                            title="Dashboard"
                            to='/dashboard'
                        ></SidebarMenu.Item>
                        { /* -------- Campaigns ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-industry"></i>}
                            title="Campaigns"
                            to='/campaign'
                        ></SidebarMenu.Item>
                        { /* -------- Participants ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-users"></i>}
                            title="Participants"
                            to='/participants'
                        ></SidebarMenu.Item>
                        { /* -------- Customers ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-user"></i>}
                            title="Customers"
                            to='/customers'
                        ></SidebarMenu.Item>
                        { /* -------- Commissions ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-money"></i>}
                            title="Commissions"
                            to='/commissions'
                        ></SidebarMenu.Item>
                        { /* -------- Payouts ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-credit-card"></i>}
                            title="Payouts"
                            to='/Payouts'
                        ></SidebarMenu.Item>
                        { /* -------- Emails ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-envelope-o"></i>}
                            title="Emails"
                            to='/notifications-templates'
                        ></SidebarMenu.Item>
                        { /* -------- Assets ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-folder-open-o"></i>}
                            title="Assets"
                        >
                            <SidebarMenu.Item title="Brand Logo" to='/logo' exact />
                            <SidebarMenu.Item title="Brand Assets" to='/assets' exact />
                        </SidebarMenu.Item>
                        { /* -------- Settings ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-wrench"></i>}
                            title="Webhooks"
                            to='/webhook'
                        ></SidebarMenu.Item>
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-gear"></i>}
                            title="Settings"
                            to='/settings'
                        ></SidebarMenu.Item>
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-bookmark-o"></i>}
                            title="Docs"
                            href='#'
                        />
                    </SidebarMenu >
                )
            }else if(this.state.participant){
                return(
                    <SidebarMenu>
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-home"></i>}
                            title="Dashboard"
                            to='/my-dashboard'
                        ></SidebarMenu.Item>
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-money"></i>}
                            title="Commissions"
                            to='/profile/commissions'
                        ></SidebarMenu.Item>
                        { /* -------- Payouts ---------*/}
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-credit-card"></i>}
                            title="Payouts"
                            to='/profile/payouts'
                        ></SidebarMenu.Item>
                        <SidebarMenu.Item
                            icon={<i className="fa fa-fw fa-folder-o"></i>}
                            title="Assets"
                            to='/profile/assets'
                        ></SidebarMenu.Item>
                    </SidebarMenu>
                )
            }
        }
    }
    
};
