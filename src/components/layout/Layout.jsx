import React from "react";

const Layout = ({children}) => {
    return (
        <div className="content-center min-h-screen">
            {children}
        </div>
    )
}

export default Layout;