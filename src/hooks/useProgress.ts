import { useState, useEffect } from 'react'

export function useProgress() {
    // Initialize from localStorage or empty array
    const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('react-katas-progress')
            return saved ? JSON.parse(saved) : []
        } catch (e) {
            console.warn('Failed to parse progress from localStorage', e)
            return []
        }
    })

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('react-katas-progress', JSON.stringify(completedLessons))
    }, [completedLessons])

    const toggleLessonCompletion = (lessonId: string) => {
        setCompletedLessons((prev) => {
            if (prev.includes(lessonId)) {
                return prev.filter((id) => id !== lessonId)
            } else {
                return [...prev, lessonId]
            }
        })
    }

    const isLessonCompleted = (lessonId: string) => {
        return completedLessons.includes(lessonId)
    }

    return {
        completedLessons,
        toggleLessonCompletion,
        isLessonCompleted
    }
}
