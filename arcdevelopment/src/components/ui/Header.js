import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

const useStyles = makeStyles(theme => ({
    toolbarMargin :  {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em",
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em",
        }
    },
    logo : {
        height : "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em",
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em",
        }
    },
    logoContainer : {
        padding : 0,
        "&:hover": {
            background : "transparent"
        }
    },
    tabContainer : {
        marginLeft : "auto",
    },
    tab : {
        ...theme.typography.tab,
        minWidth : 10,
        marginLeft : "25px",
    },
    button : {
        ...theme.typography.estimate,
       borderRadius: "50px", 
       marginLeft: "50px",
       marginRight: "25px",
       height: "45px",
       "&:hover": {
        backgroundColor: theme.palette.secondary.light,
        },
    },
    menu : {
        backgroundColor : theme.palette.common.blue,
        color : "white",
        borderRadius : "0",
    },
    menuItem : {
        ...theme.typography.tab,
        opacity : "0.7",
        "&:hover": {
            opacity : "1",
        }
    },
    drawerIconContainer : {
        marginLeft : "auto",
        "&:hover": {
            backgroundColor : "transparent",
        }
    },
    drawerIcon : {
        height : "50px",
        width : "50px"
    },
    drawer : {
       backgroundColor : theme.palette.common.blue, 
    },
    drawerItem : {
        ...theme.typography.tab,
        color : "white",
        opacity : 0.7,
    },
    drawerItemEstimate : {
        backgroundColor : theme.palette.common.orange,
    },
    drawerItemSelected : {
        "& .MuiListItemText-root": {
            opacity: 1,
        }  
    },
    appbar : {
        zIndex : theme.zIndex.modal + 1,
    }


}))


export default function Header(props) {
    const {value, setValue, selectedIndex, setSelectedIndex } = props;
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    
    const menuOptions = [{name : "Services", link : "/services", activeIndex : 1, selectedIndex : 0}, 
    {name : "Custome Software Development", link : "/customsoftware", activeIndex : 1, selectedIndex : 1}, 
    {name : "iOS/Android App Development", link : "/mobileapp", activeIndex : 1, selectedIndex : 2},
     {name : "Website Development", link : "/websites", activeIndex : 1, selectedIndex : 3}]; 
   
    const routes = [{name : "Home", link : "/", activeIndex : 0}, 
    {name : "Services", link : "/services", activeIndex : 1, ariaOwns : anchorEl ? "simple-menu" : undefined, 
            ariaHasPopup : anchorEl ? true : undefined, onMouseHover : event => handleClick(event)}, 
    {name : "The Revolution", link : "/revolution", activeIndex : 2}, 
    {name : "About Us", link : "/about", activeIndex : 3}, 
    {name : "Contact Us", link : "/contact", activeIndex : 4}]

    const handleClose = e => {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    const handleChange = (e, newValue) => { 
        setValue(newValue);
    };

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
        setValue(1);
    }

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if(value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if(route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                case "/estimate" :
                    setValue(5);
                    break;
                default :
                break;
                }
        }

        
    )}, [value, selectedIndex, menuOptions, routes]);

    const tabs = (
        <React.Fragment>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                className={classes.tabContainer}
                indicatorColor="primary">
                    {
                        routes.map((route, index) => (
                            <Tab key={`${route}${index}`}
                            className={classes.tab} label={route.name} component={Link} to={route.link}
                                    aria-owns={route.ariaOwns} 
                                    aria-haspopup={route.ariaHasPopup} 
                                    onMouseOver={route.onMouseHover}/>
                        ) 
                        )
                    }
                   </Tabs>
            <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/estimate" onClick={() => setValue(5)}>Free Estimate</Button>
            <Menu id="simple-menu"
                classes={{paper: classes.menu}}
                elevation = {0}
                anchorEl={anchorEl} open={openMenu} onClose={handleClose}
                MenuListProps={{onMouseLeave: handleClose}}
                keepMounted
                style={{zIndex:1302}}
                >
                {menuOptions.map((option, i) => (
                    <MenuItem key={`${option}${i}`} onClick={(event) => {handleMenuItemClick(event, i)}}  selected={selectedIndex === i && value === 1} classes={{root : classes.menuItem}} component={Link} to={option.link}>{option.name}</MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer classes={{paper : classes.drawer}} disableBackdropTransition={!iOS} disableDiscovery={iOS}
            open={openDrawer} onOpen={() => setOpenDrawer(true)} onClose={() => setOpenDrawer(false)}>
                <div className={classes.toolbarMargin}/>
               <List disablePadding>
                   {routes.map(route => 
                   <ListItem key={`${route}${route.activeIndex}`} classes={{selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); setValue(route.activeIndex)}} divider button component={Link} to={route.link} selected={value === route.activeIndex}>
                   <ListItemText className={classes.drawerItem} disableTypography>
                        {route.name}
                   </ListItemText>
                </ListItem>
                   )}
                   <ListItem  classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); setValue(5)}} divider button component={Link} to="/estimate" selected={value === 5}>
                   <ListItemText className={classes.drawerItem} disableTypography>
                        Free Estimate
                   </ListItemText>
                </ListItem>
                
                </List>     
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    )

    return (
        <React.Fragment>
        <ElevationScroll>
             <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" className={classes.logoContainer} disableRipple onClick={() => setValue(0)} >
                            <img alt="company logo" className={classes.logo} src={logo} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
              </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin}/>
        </React.Fragment>
       
    )

}