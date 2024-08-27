export interface MatchQuestion {
	cardId: string
	text: string
}

export interface SelectQuestion {
	cardId: string
	termin: string
	definitionIndex: number
	variants: string[]
}

export interface TestQuestion {
	cardId: string
	termin: string
	definition: string
}

export type LearningQuestion = SelectQuestion | TestQuestion
