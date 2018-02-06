import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router'
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import IconHome from 'material-ui/svg-icons/action/home'
import IconDashboard from 'material-ui/svg-icons/action/dashboard'
import IconAnalytics from 'material-ui/svg-icons/editor/insert-chart'
import IconTest from 'material-ui/svg-icons/editor/mode-edit'
import IconNews from 'material-ui/svg-icons/action/info'
import IconUpdates from 'material-ui/svg-icons/action/update'
import IconSettings from 'material-ui/svg-icons/action/settings'
import IconHelp from 'material-ui/svg-icons/action/help'

import {connect} from 'react-redux'
import {toggleActions} from '../../actions/toggleActions'

const drawerStyle = {
  height: 'calc(100% - 64px)',
  top: 64,
  width: 230,
  backgroundColor: '#424242',
}

const menuStyle = {
  maxWidth: 227,
}

const menuItemStyle = {
  color: "#FFFFFF",
}

const selectedStyle = {
  backgroundColor: "#FF0000"
}

const active = {
  backgroundColor: '#323232'
}

class DrawerComponent extends Component {
  constructor (props) {
    super(props)
    this.menuItemClicked = this.menuItemClicked.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);

    this.state = {
      menuIndex: 0
    }
  }

  closeSideNav () {
    const {dispatch} = this.props
    dispatch(toggleActions.closeSideNav())
  }

  menuItemClicked (event, menuItem, index) {
    console.log(index)
    if(this.props.isMobile) {
      const {dispatch} = this.props
      dispatch(toggleActions.closeSideNav())
    }   
    hashHistory.push(menuItem.key);

    this.setState({menuIndex: index})

  }

  render() {
    return (
      <div className="drawer-div">
        
        <Drawer containerStyle={drawerStyle} open={this.props.openSideNav} className="drawer-div" docked={!this.props.isMobile} onRequestChange={this.closeSideNav}>

          <Menu style={menuStyle} onItemClick={this.menuItemClicked}>

            <MenuItem
                style={Object.assign(this.state.menuIndex == 0 ? active:'', menuItemStyle)}
                key="/dashboard"
                primaryText="Dashboard"
                leftIcon={<IconDashboard color={'#FFFFFF'} />} />

            <MenuItem
                style={Object.assign(this.state.menuIndex == 1 ? active:'', menuItemStyle)}
                key="/dashboard/book_room"
                primaryText="Room Booking"
                leftIcon={<IconTest color={'#FFFFFF'} />} />

            <MenuItem
                style={Object.assign(this.state.menuIndex == 2 ? active:'', menuItemStyle)}
                key="/dashboard/myEvents"
                primaryText="My Events"
                leftIcon={<IconAnalytics color={'#FFFFFF'} />} />
            
          </Menu>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile} = state.toggler
  return {
    openSideNav,
    isMobile
  }
}

export default connect(mapStateToProps)(DrawerComponent)