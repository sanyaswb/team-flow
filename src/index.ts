// components
import { BurgerComponent } from './scripts/components/burger-component';

const components = {
	burger: new BurgerComponent()
}

for (const c of Object.keys(components)) {
	components[c].init();
}