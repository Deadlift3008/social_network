import * as React from 'react';
import { Menu } from './Menu';

export function AppHOC(WrappedComponent, props) {
    return class extends React.Component {
        render() {
            return (
                <div className="wrapper">
                    <Menu isAuthenticated={props.isAuthenticated}/>
                    <div className="app-content">
                        <WrappedComponent {...this.props} />
                    </div>
                </div>
            )
        }
    }
}