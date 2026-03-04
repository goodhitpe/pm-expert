# 강의 슬라이드 제작 작업 계획서

**작성일**: 2026-02-27  
**목적**: Draft004 summaries → HTML 발표자료(slide) 전체 재작성  
**작업 방식**: Day별 순차 작성 (Day01 → Day17)

---

## 1. 작업 원칙

| 항목 | 내용 |
|------|------|
| 슬라이드 목표 | Day당 22~30장 |
| 소스 파일 | `summaries/dayNN-topic.md` (개요) + `summaries/dayNN-topic-detail.md` (디테일) |
| slide 저장 위치 | `slides/dayNN-topic-slide.html` |
| report 저장 위치 | `reports/dayNN-topic-report.md` |
| CSS/JS | `../css/presentation.css`, `../js/presentation.js` (공유) |

---

## 2. 슬라이드 표준 구성 (Day당)

```
[1] 타이틀 슬라이드                      → .title-slide
[2] 학습 목표 (카드 3~4개)               → .card-grid
[3] 오늘의 흐름 (6교시 로드맵)           → .diagram / 표
─── 교시 블록 ×6 ───
[교시N-1] Section 슬라이드               → .section-slide
[교시N-2] 핵심 이론 슬라이드 ×2~4       → .info-box / .two-col / .table-wrapper
[교시N-3] 예시/실습 슬라이드 ×1         → .practice-box / .comparison
─────────────────────
[마지막-1] 핵심 키워드                   → .keyword-tags
[마지막-2] 학습 확인 퀴즈               → .quiz-box
[마지막-3] 다음 Day 예고                → .info-box.gold
```

---

## 3. report 구성 (Day당)

```markdown
# DayNN 슬라이드 제작 리포트

## 1. 슬라이드 개요
- 총 슬라이드 수
- 교시별 슬라이드 수

## 2. 개요 파일 → 슬라이드 매핑 결과

## 3. 디테일 파일 대비 커버리지 분석
- 각 교시별: 커버된 내용 / 누락된 내용

## 4. 보완 필요 항목
- 피드백 시 추가 작업이 필요한 부분

## 5. 이미지/다이어그램 필요 항목
```

---

## 4. 작업 진행표

| # | Day | 주제 | 디테일 Lines | 목표 슬라이드 | slide 파일 | report 파일 | 상태 |
|---|-----|------|-------------|-------------|-----------|------------|------|
| 1 | Day01 | 오리엔테이션 | 1,740 | 22~25 | day01-orientation-slide.html | day01-orientation-report.md | ⬜ 대기 |
| 2 | Day02 | 프로젝트 통합관리 | 2,444 | 24~28 | day02-integration-slide.html | day02-integration-report.md | ⬜ 대기 |
| 3 | Day03 | 범위관리 | 1,420 | 20~24 | day03-scope-slide.html | day03-scope-report.md | ⬜ 대기 |
| 4 | Day04 | 일정관리 | 3,477 | 26~30 | day04-schedule-slide.html | day04-schedule-report.md | ⬜ 대기 |
| 5 | Day05 | 원가관리 | 4,637 | 28~32 | day05-cost-slide.html | day05-cost-report.md | ⬜ 대기 |
| 6 | Day06 | 품질관리 | 1,676 | 22~26 | day06-quality-slide.html | day06-quality-report.md | ⬜ 대기 |
| 7 | Day07 | 자원관리 | 1,663 | 22~26 | day07-resource-slide.html | day07-resource-report.md | ⬜ 대기 |
| 8 | Day08 | 의사소통관리 | 1,318 | 20~24 | day08-communication-slide.html | day08-communication-report.md | ⬜ 대기 |
| 9 | Day09 | 리스크관리 | 1,209 | 20~24 | day09-risk-slide.html | day09-risk-report.md | ⬜ 대기 |
| 10 | Day10 | 조달관리 | 1,249 | 20~24 | day10-procurement-slide.html | day10-procurement-report.md | ⬜ 대기 |
| 11 | Day11 | 이해관계자관리 | 2,767 | 22~26 | day11-stakeholder-slide.html | day11-stakeholder-report.md | ⬜ 대기 |
| 12 | Day12 | SW공학 및 방법론 | 6,041 | 28~34 | day12-sw-engineering-slide.html | day12-sw-engineering-report.md | ⬜ 대기 |
| 13 | Day13 | 네트워크 및 인프라 | 10,253 | 30~36 | day13-network-slide.html | day13-network-report.md | ⬜ 대기 |
| 14 | Day14 | 보안관리 | 2,053 | 22~26 | day14-security-slide.html | day14-security-report.md | ⬜ 대기 |
| 15 | Day15 | 데이터베이스 | 2,210 | 22~26 | day15-database-slide.html | day15-database-report.md | ⬜ 대기 |
| 16 | Day16 | 신기술 동향 | 3,231 | 24~28 | day16-new-tech-slide.html | day16-new-tech-report.md | ⬜ 대기 |
| 17 | Day17 | 종합정리 | 956 | 22~26 | day17-review-slide.html | day17-review-report.md | ⬜ 대기 |

---

## 5. 범례

- ⬜ 대기  
- 🔄 진행중  
- ✅ 완료  
- 🔁 피드백 반영 필요

---

## 6. 업데이트 이력

| 날짜 | 항목 | 내용 |
|------|------|------|
| 2026-02-27 | 계획서 작성 | 17 Day 슬라이드 제작 계획 수립 |
