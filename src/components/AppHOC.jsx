import * as React from 'react';
import { Menu} from './Menu';

export function AppHOC(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <div className="wrapper">
                    <Menu />
                    <div className="app-content">
                        <WrappedComponent {...this.props} />
                    </div>
                </div>
            )
        }
    }
}