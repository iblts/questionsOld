import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from 'react'
import type { IModule } from '../../types/module'

interface IModuleContext {
	module: IModule
	setModule: Dispatch<SetStateAction<IModule>>
}

const ModuleContext = createContext<IModuleContext | null>(null)

export const useModuleContext = () => {
	const moduleContext = useContext(ModuleContext)
	if (!moduleContext) {
		throw new Error(
			'useModuleContext has to be used within <ModuleContext.Provider>'
		)
	}
	return moduleContext
}

export const ModuleContextProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [module, setModule] = useState({
		id: 1,
		title: 'Loading...',
		description: '',
		terms: 2,
		cardsId: [0],
		isSolved: false,
	})

	const contextValue = useMemo(() => ({ module, setModule }), [module])
	return (
		<ModuleContext.Provider value={contextValue}>
			{children}
		</ModuleContext.Provider>
	)
}
