import React from 'react';

// Load root styles
import '../styles/index.scss';

const Layout = (props: any) => {
	return <div>{props.children}</div>;
};

export default Layout;
