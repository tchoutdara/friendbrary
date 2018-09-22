moods = ['happy', 'sad', 'angry', 'wonderfulß']

50.times do
    Post.create(
        title: Faker::Hipster.word,
        posting: Faker::FamousLastWords.last_words,
        mood: moods.sample

    )
end
