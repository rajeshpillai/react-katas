import { describe, it, expect } from 'vitest'
import {
    TIERS,
    INTERVIEW_SEQUENCES,
    getTier,
    getSequence,
    getTierFromPath,
    type TierId,
} from './interview-tiers'

describe('interview-tiers data', () => {
    it('exports five tiers in order', () => {
        expect(TIERS.map((t) => t.id)).toEqual([
            'beginner',
            'junior',
            'mid',
            'senior',
            'architect',
        ])
    })

    it('every tier has a sequence', () => {
        for (const tier of TIERS) {
            expect(INTERVIEW_SEQUENCES[tier.id]).toBeDefined()
            expect(Array.isArray(INTERVIEW_SEQUENCES[tier.id])).toBe(true)
        }
    })

    it('every tier has the required metadata fields', () => {
        for (const tier of TIERS) {
            expect(tier.id).toBeTruthy()
            expect(tier.label).toBeTruthy()
            expect(tier.years).toBeTruthy()
            expect(tier.accent).toMatch(/^#/)
            expect(tier.intro.length).toBeGreaterThan(20)
            expect(tier.targetCount).toBeGreaterThan(0)
        }
    })
})

describe('getTier', () => {
    it('returns the tier for a known id', () => {
        expect(getTier('beginner')?.id).toBe('beginner')
        expect(getTier('architect')?.label).toContain('Architect')
    })

    it('returns undefined for unknown ids', () => {
        expect(getTier('intern')).toBeUndefined()
        expect(getTier('')).toBeUndefined()
    })
})

describe('getSequence', () => {
    it('returns the sequence for a known tier', () => {
        const seq = getSequence('beginner')
        expect(seq.length).toBeGreaterThan(0)
        for (const item of seq) {
            expect(item.question.length).toBeGreaterThan(0)
        }
    })

    it('returns an empty array for an unknown tier (defensive)', () => {
        // Cast bypasses the type check — simulating a runtime call with bad data
        expect(getSequence('mystery' as TierId)).toEqual([])
    })
})

describe('getTierFromPath', () => {
    it('parses /interview/<tier>', () => {
        expect(getTierFromPath('/interview/beginner')).toBe('beginner')
        expect(getTierFromPath('/interview/mid')).toBe('mid')
        expect(getTierFromPath('/interview/architect')).toBe('architect')
    })

    it('returns undefined for non-tier paths', () => {
        expect(getTierFromPath('/')).toBeUndefined()
        expect(getTierFromPath('/interview')).toBeUndefined()
        expect(getTierFromPath('/interview/')).toBeUndefined()
        expect(getTierFromPath('/lessons/jsx-basics')).toBeUndefined()
    })

    it('returns undefined for unknown tier ids', () => {
        expect(getTierFromPath('/interview/staff')).toBeUndefined()
        expect(getTierFromPath('/interview/PRINCIPAL')).toBeUndefined()
    })

    it('does not match nested paths past the tier id', () => {
        expect(getTierFromPath('/interview/mid/extra')).toBeUndefined()
    })
})

describe('sequence integrity', () => {
    it('beginner sequence size equals its target', () => {
        const beginner = getTier('beginner')!
        expect(getSequence('beginner').length).toBe(beginner.targetCount)
    })

    it('every sequence item has either lessonId or remains a placeholder', () => {
        for (const tier of TIERS) {
            for (const item of getSequence(tier.id)) {
                // lessonId is optional; question is required
                expect(typeof item.question).toBe('string')
                if (item.lessonId !== undefined) {
                    expect(item.lessonId.length).toBeGreaterThan(0)
                }
            }
        }
    })
})
