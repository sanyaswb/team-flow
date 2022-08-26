// components
import { BurgerComponent } from './scripts/components/burger-component';

// providers
import { RootProvider } from './scripts/providers/root-provider';
import { HeaderComponent } from './scripts/components/header-component';

(function(){
	RootProvider.init();

	const components = {
		header: new HeaderComponent(),
		burger: new BurgerComponent()
	}

	for (const c of Object.keys(components)) {
		components[c].init();
	}
})();