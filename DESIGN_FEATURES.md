# Vocabulary App Design Features
## Target Reference: Vocabulary - Learn Words Daily by Monkey Taps

200 distinct design features organized by category for implementation targeting.

---

## A. Navigation & Layout (1-20)

1. **Bottom tab bar navigation** - Fixed iOS-style tab bar with 5 main sections
2. **Active tab indicator dot** - Small colored dot below active tab icon
3. **Tab icon scale animation** - Subtle 5% scale increase on active tab
4. **Backdrop blur tab bar** - Frosted glass effect on navigation bar
5. **Safe area padding** - Proper inset for notched devices (pb-safe)
6. **Sidebar navigation** - Desktop/tablet responsive sidebar layout
7. **Collapsible sidebar** - Toggle sidebar visibility on larger screens
8. **Sticky header** - Fixed position header on scroll
9. **Pull-to-refresh** - Swipe down to refresh content
10. **Infinite scroll** - Load more content on scroll to bottom
11. **Floating action button** - Quick access to primary action
12. **Breadcrumb navigation** - Hierarchical path display for deep navigation
13. **Back button with label** - iOS-style back navigation with previous screen title
14. **Swipe gestures** - Left/right swipe for navigation between cards
15. **Tab bar badge indicators** - Notification dots on tab icons
16. **Full-screen modal** - Edge-to-edge modal presentations
17. **Bottom sheet modals** - Draggable bottom-up modals
18. **Split view layout** - Master-detail view for tablets
19. **Gesture-based dismissal** - Swipe down to dismiss modals
20. **Haptic feedback on navigation** - Subtle vibration on tab switches

---

## B. Home Screen & Daily Content (21-45)

21. **Concept of the Day hero card** - Featured daily word with prominent display
22. **Daily streak counter** - Visual indicator of consecutive learning days
23. **Progress ring** - Circular progress indicator for daily goal
24. **Greeting with time of day** - "Good morning/afternoon/evening" personalization
25. **Recent concepts list** - Vertical list of recently viewed words
26. **Quick quiz prompt** - CTA to start quiz on daily word
27. **Bookmark button on cards** - Heart/bookmark icon for saving
28. **Category badge** - Colored pill showing word category
29. **Difficulty badge** - Visual indicator of word complexity level
30. **Truncated definition preview** - Line-clamp for long definitions
31. **Card hover lift animation** - Subtle shadow and Y-translate on hover
32. **Serif font for terms** - Elegant typography for vocabulary words
33. **Sans-serif for UI text** - Clean font for interface elements
34. **Section headers with caps** - Uppercase tracking for section labels
35. **Chevron indicators** - Right arrow showing navigable items
36. **Word count indicator** - "X concepts available" text
37. **Last updated timestamp** - When content was last refreshed
38. **Motivational quotes** - Daily inspiration text
39. **Continue learning section** - Resume where user left off
40. **Learning suggestions** - Personalized recommendations
41. **Statistics summary** - Words learned, streak, accuracy
42. **Weekly goal tracker** - Progress toward weekly learning target
43. **Achievement unlock banner** - Celebration for milestones
44. **Seasonal theme decorations** - Holiday/season visual accents
45. **Word of the day notification preview** - Mini card style

---

## C. Word Detail View (46-70)

46. **Large serif term header** - 4xl font size for word display
47. **Audio pronunciation button** - Play icon for word audio
48. **Phonetic spelling** - IPA or pronunciation guide
49. **Definition section card** - Boxed definition display
50. **Explanation/context section** - Detailed usage explanation
51. **Example sentences** - Real-world usage in context
52. **Code/technical examples** - Syntax-highlighted code blocks
53. **Etymology section** - Word origin and history
54. **Synonyms list** - Related words with similar meaning
55. **Antonyms list** - Opposite meaning words
56. **Related concepts** - Links to connected vocabulary
57. **Part of speech indicator** - Noun, verb, adjective labels
58. **Multiple definitions** - Numbered list of meanings
59. **Usage notes** - Tips on proper word usage
60. **Common mistakes section** - Avoid these errors
61. **Memory tip/mnemonic** - Learning aid for retention
62. **Visual illustration** - Image or diagram for concept
63. **Word frequency indicator** - How common the word is
64. **Copy to clipboard** - Quick copy term or definition
65. **Share word button** - Social sharing functionality
66. **Report issue link** - Flag incorrect information
67. **Add to collection** - Organize into custom lists
68. **Mark as learned** - Track completion status
69. **Difficulty rating** - User can rate word difficulty
70. **Notes field** - Personal annotation space

---

## D. Quiz & Assessment (71-100)

71. **Quiz question count selector** - Choose 5/10/15 questions
72. **Multiple choice format** - 4-option answer selection
73. **Progress bar** - Horizontal quiz completion indicator
74. **Question counter** - "Question X of Y" display
75. **Definition-to-term matching** - Show definition, pick word
76. **Term-to-definition matching** - Show word, pick meaning
77. **Fill-in-the-blank** - Complete the sentence
78. **True/false questions** - Binary answer format
79. **Correct answer highlight** - Green border/background on correct
80. **Incorrect answer highlight** - Red border/background on wrong
81. **Answer explanation** - Show why answer was correct
82. **Immediate feedback** - Instant right/wrong indication
83. **Next question button** - Manual advance after answer
84. **Auto-advance option** - Automatic progression
85. **Quiz timer** - Optional countdown per question
86. **Score percentage display** - Large % on results screen
87. **Score-based messaging** - "Excellent!", "Keep practicing"
88. **Results breakdown** - Correct/incorrect summary
89. **Retry quiz button** - Start same quiz over
90. **Try different words button** - New quiz generation
91. **Review mistakes** - See only wrong answers
92. **Skip question option** - Pass on difficult items
93. **Hint system** - Progressive clues for answers
94. **Confidence rating** - "Sure/unsure" before reveal
95. **Timed challenge mode** - Speed-based scoring
96. **Streak bonus points** - Extra points for consecutive correct
97. **Daily quiz challenge** - Curated daily quiz
98. **Category-specific quiz** - Filter by topic
99. **Difficulty-filtered quiz** - Select by complexity
100. **Adaptive difficulty** - Questions adjust to performance

---

## E. Spaced Repetition & Learning Science (101-120)

101. **Spaced repetition algorithm** - SM-2 or similar scheduling
102. **Review due indicator** - Cards ready for review count
103. **Next review date** - When word will reappear
104. **Mastery level progress** - Learning/reviewing/mastered states
105. **Forgetting curve visualization** - Graph of retention over time
106. **Confidence-based scheduling** - User input affects intervals
107. **Review session mode** - Focused review of due cards
108. **Cramming mode** - Intensive short-term review
109. **Long-term retention score** - Overall mastery metric
110. **Study session timer** - Time spent learning display
111. **Optimal review reminder** - Push notification for ideal timing
112. **Learning efficiency stats** - Performance over time
113. **Weakest words list** - Cards user struggles with
114. **Strongest words list** - Well-mastered vocabulary
115. **Retention rate percentage** - Success rate over reviews
116. **Review history log** - Past review sessions list
117. **Memory strength indicator** - Visual strength bar
118. **Decay prediction** - Estimated forgetting timeline
119. **Re-learn flagging** - Mark word for extra review
120. **Graduated intervals** - 1d -> 3d -> 7d -> 30d schedule

---

## F. Collections & Organization (121-140)

121. **Bookmark/save functionality** - Heart icon toggle
122. **Bookmarks page** - Saved words list view
123. **Custom collections** - User-created word lists
124. **Collection folders** - Hierarchical organization
125. **Collection sharing** - Export/share lists
126. **Smart collections** - Auto-generated by criteria
127. **Collection search** - Filter saved words
128. **Collection sorting** - By date, alphabetical, difficulty
129. **Bulk select mode** - Multi-select for actions
130. **Remove from collection** - Delete saved items
131. **Collection cover images** - Visual thumbnails
132. **Collection word count** - Number of items badge
133. **Collection progress** - % mastered in list
134. **Import collections** - Load external word lists
135. **Export to CSV/PDF** - Data portability
136. **Collection templates** - Pre-made topic lists
137. **Recently removed** - Recover deleted items
138. **Archive collections** - Hide without deleting
139. **Pin favorite collections** - Quick access ordering
140. **Collection color labels** - Visual organization

---

## G. Search & Discovery (141-160)

141. **Global search bar** - Universal word search
142. **Search suggestions** - Auto-complete as you type
143. **Recent searches** - Search history list
144. **Search filters** - Category, difficulty, status
145. **Search results count** - "X results found"
146. **Highlighted search matches** - Bold matching text
147. **No results state** - Empty state with suggestions
148. **Explore/browse page** - Category grid view
149. **Category cards** - Visual category selection
150. **Trending words** - Popular/commonly viewed
151. **New words indicator** - Recently added content
152. **Random word generator** - Surprise discovery
153. **A-Z alphabetical index** - Letter navigation
154. **Advanced search** - Boolean operators support
155. **Voice search** - Speech-to-text input
156. **Search by example** - Find words from context
157. **Related searches** - Similar query suggestions
158. **Saved searches** - Quick access to queries
159. **Search scope selector** - All/saved/mastered
160. **Semantic search** - Meaning-based matching

---

## H. Themes & Appearance (161-180)

161. **Dark mode toggle** - Light/dark theme switch
162. **System theme following** - Auto match OS preference
163. **Custom accent color** - User-selected primary color
164. **Theme presets** - Multiple color schemes
165. **Seasonal themes** - Holiday/seasonal appearances
166. **Font size adjustment** - Accessibility scaling
167. **Reduced motion option** - Disable animations
168. **High contrast mode** - Enhanced visibility
169. **Custom backgrounds** - Wallpaper selection
170. **Card style options** - Rounded/sharp corners
171. **Compact/comfortable density** - Spacing options
172. **Icon style toggle** - Filled/outlined icons
173. **Gradient accents** - Subtle color gradients
174. **Blur intensity control** - Frosted glass adjustment
175. **Reading font selection** - Multiple typefaces
176. **True black dark mode** - OLED optimization
177. **Tinted dark mode** - Warm/cool dark variants
178. **Widget theme matching** - Consistent widget appearance
179. **Color blind friendly mode** - Accessible palettes
180. **Preview theme changes** - Live preview before applying

---

## I. Notifications & Reminders (181-195)

181. **Daily reminder notification** - Word of the day push
182. **Custom reminder time** - User-set notification time
183. **Multiple reminders** - Morning/evening options
184. **Streak reminder** - Don't break your streak alert
185. **Review due notification** - Spaced repetition prompt
186. **Weekly summary** - Progress digest notification
187. **Achievement notifications** - Milestone celebrations
188. **Smart reminders** - AI-optimized timing
189. **Quiet hours** - Do not disturb schedule
190. **Notification frequency control** - Daily/weekly/off
191. **Rich notification content** - Word preview in notification
192. **Actionable notifications** - Quick actions from alert
193. **Notification sound selection** - Custom alert tones
194. **Badge count updates** - Unread/due count on app icon
195. **In-app notification center** - Activity feed

---

## J. Gamification & Engagement (196-200+)

196. **Learning streaks** - Consecutive day counter
197. **Achievement badges** - Unlockable accomplishments
198. **Experience points** - XP for activities
199. **Level progression** - User level based on XP
200. **Daily goals** - Target words per day

---

## Bonus Features (201-220)

201. **Weekly challenges** - Time-limited goals
202. **Leaderboards** - Compare with other learners
203. **Friends system** - Social learning connections
204. **Challenge a friend** - Head-to-head quizzes
205. **Profile statistics** - Detailed learning metrics
206. **Learning milestones** - 100/500/1000 words badges
207. **Category mastery badges** - Complete all in category
208. **Perfect quiz trophy** - 100% quiz completion reward
209. **Early bird badge** - Morning learning reward
210. **Night owl badge** - Evening study recognition
211. **Consistency crown** - Long streak achievement
212. **Widget variants** - Multiple home screen widget sizes
213. **Lock screen widget** - iOS 16+ lock screen support
214. **Apple Watch app** - Wrist-based learning
215. **Siri shortcuts** - Voice command integration
216. **Today widget** - Notification center widget
217. **iMessage extension** - Share words in messages
218. **Offline mode** - Full functionality without internet
219. **Data sync** - iCloud/account synchronization
220. **Onboarding flow** - First-time user tutorial

---

## Implementation Priority Matrix

### Phase 1: Core Experience (Features 1-50)
Navigation, home screen, daily content, basic interactions

### Phase 2: Learning Engine (Features 71-120)
Quiz system, spaced repetition, review mechanics

### Phase 3: Organization (Features 121-160)
Collections, search, discovery features

### Phase 4: Polish & Delight (Features 161-200)
Themes, notifications, gamification

### Phase 5: Platform Expansion (Features 201-220)
Widgets, integrations, social features

---

## Sources & References

- [Vocabulary - Learn Words Daily (App Store)](https://apps.apple.com/us/app/vocabulary-learn-words-daily/id1084540807)
- [The Vocabulary App](https://thevocabulary.app/)
- [Speed Reading Lounge - Vocabulary Apps 2026](https://www.speedreadinglounge.com/vocabulary-apps)
- [Cogniteq - How to Build a Vocabulary Mobile App](https://www.cogniteq.com/blog/how-build-vocabulary-mobile-app)
- [UX Case Study - Creative Cards](https://medium.com/@lugaozhu/ux-case-study-creative-cards-a-vocabulary-learning-app-design-f218715ada2c)
- [Modern Flashcard App UI UX Design 2025](https://medium.com/@prajapatisuketu/modern-flashcard-app-ui-ux-design-2025-4545294a17b4)
