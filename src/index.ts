// components
import { BurgerComponent } from './scripts/components/burger-component';

// providers
import { RootProvider } from './scripts/providers/root-provider';

(function(){
	RootProvider.init();

	const components = {
		burger: new BurgerComponent()
	}

	for (const c of Object.keys(components)) {
		components[c].init();
	}
})();