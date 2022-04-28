import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import HomeDashboard from './homedashboard/HomeDashboard';
import AddIcon from '@mui/icons-material/Add';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import MakeAdmin from './makeadmin/MakeAdmin';
import AddProduct from '../pages/addProduct/AddProduct';
import useAuth from '../hooks/useAuth';
import AdminPrivate from './adminPrivate/AdminPrivate';
import ManageProduct from '../pages/addProduct/mangeProduct/ManageProduct'
import ProfileInfo from './profileInfo/ProfileInfo';
import ManageAllOrders from './manageallorders/ManageAllOrders';
const drawerWidth = 240;
function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {admin} = useAuth();
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    let { path, url } = useRouteMatch();

    const drawer = (
      <div>
        
        <List sx={{mt:5}}>
        <Link style={{textDecoration:'none'}} to="/home"><Button sx={{width:'80%'}} variant="outlined"><HomeIcon></HomeIcon> Home</Button></Link>
              <br />
              <br />
              <Link style={{textDecoration:'none'}} to={`${url}/profileinfo`}><Button sx={{width:'80%'}}variant="outlined"><AccountBoxIcon></AccountBoxIcon>Profile Info</Button></Link>
              <br />
              <br />
              {
                admin && <> <Link style={{textDecoration:'none'}} to={`${url}/addproduct`}><Button sx={{width:'80%'}}variant="outlined"><AddIcon></AddIcon> Add Product</Button></Link>
                <br />
                <br />
                <Link style={{textDecoration:'none'}} to={`${url}/makeadmin`}><Button sx={{width:'80%'}}variant="outlined"><SupervisorAccountIcon></SupervisorAccountIcon> Make Admin</Button></Link>
                <br />
                <br />
                <Link style={{textDecoration:'none'}} to={`${url}/manageproducts`}><Button sx={{width:'80%'}}variant="outlined"><ManageAccountsIcon></ManageAccountsIcon>Manage Products</Button></Link>
                <br />
                <br />
                <Link style={{textDecoration:'none'}} to={`${url}/manageallorders`}><Button sx={{width:'80%'}}variant="outlined"><ManageAccountsIcon></ManageAccountsIcon>Manage All Orders</Button></Link>
                </>
              }
        </List>
        
        
      </div>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
             Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Switch>
        <Route exact path={path}>
          <HomeDashboard></HomeDashboard>
        </Route>
        <Route exact path={`${path}/profileinfo`}>
         <ProfileInfo></ProfileInfo>
        </Route>
        <AdminPrivate path={`${path}/addproduct`}>
          <AddProduct></AddProduct>
        </AdminPrivate>
        <AdminPrivate path={`${path}/makeadmin`}>
          <MakeAdmin></MakeAdmin>
        </AdminPrivate>
        <AdminPrivate path={`${path}/manageproducts`}>
          <ManageProduct></ManageProduct>
        </AdminPrivate>
        <AdminPrivate path={`${path}/manageallorders`}>
          <ManageAllOrders></ManageAllOrders>
        </AdminPrivate>
      </Switch>
        </Box>
      </Box>
    );
  }
  
  Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
  export default Dashboard;