import type { Card, Module, User } from '@prisma/client'

export interface ModuleWithRelations extends Module {
	cards: Card[]
	author: User
}
