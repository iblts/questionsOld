import type {
	Card,
	CardProgress,
	Module,
	ModuleProgress,
	User,
} from '@prisma/client'

export interface ModuleWithRelations extends Module {
	cards: Card[]
	author: User
}

export interface ModuleProgressWithRelations extends ModuleProgress {
	module: ModuleWithRelations
	CardProgress: CardProgressWithRelations[]
}

export interface CardProgressWithRelations extends CardProgress {
	card: Card
}
