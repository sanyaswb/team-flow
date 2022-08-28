// components
import { BurgerComponent } from '@components/burger-component';
import { HeaderComponent } from '@components/header-component';
import { BrandsComponent } from '@components/brands-component';

// providers
import { RootProvider } from '@providers/root-provider';

(function(){
	RootProvider.init();

	const components = {
		header: new HeaderComponent(),
		burger: new BurgerComponent(),
		brands: new BrandsComponent()
	}

	for (const c of Object.keys(components)) {
		components[c].init();
	}
})();