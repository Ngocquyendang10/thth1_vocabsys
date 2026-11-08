/* ============================================================================
   📝 ĐỀ KIỂM TRA (dùng chung cho index.html và teacher-exam.html)
   ----------------------------------------------------------------------------
   ⚠️ FILE NÀY KHÔNG CHỨA ĐÁP ÁN. Đáp án trắc nghiệm nằm trong backend Apps Script
      (EXAM_KEYS trong Ma_THTH1_BACKEND.gs) để học viên không xem được bằng "View source".
   - Câu trắc nghiệm: options = 4 phương án, học viên chọn 1..4.
   - Câu tự luận: type "blanks" (các ô ㉠ ㉡) hoặc "essay" (đoạn văn).
   - Mã câu trả lời gửi lên server: "1".."26" (số 1–4), "27a","27b","28a","28b","29" (chữ).
   ============================================================================ */
window.EXAMS = {
  mid: {
    id: 'mid',
    title: 'KIỂM TRA GIỮA KỲ',
    subtitle: 'Tiếng Hàn Tổng hợp – Sơ cấp 1 (Bài 1 – Bài 8) · 중간고사',
    durationMin: 40,
    totalPoints: 100,
    audio: 'assets/exam/thth1_mid_listening.m4a',
    audioMaxPlays: 1,          // số lần được bấm phát file nghe (file đã đọc sẵn mỗi câu 2 lần)
    info: [
      { skill: 'Nghe (듣기)', questions: '10 câu (1–10)', points: 30, note: 'Trắc nghiệm · 3 điểm/câu · khoảng 10 phút' },
      { skill: 'Đọc (읽기)', questions: '16 câu (11–26)', points: 40, note: 'Trắc nghiệm · 2,5 điểm/câu · gợi ý 15 phút' },
      { skill: 'Viết (쓰기)', questions: '3 câu (27–29)', points: 30, note: 'Tự luận · gợi ý 15 phút' }
    ],
    rules: [
      'Thời gian làm bài <b>40 phút</b>, tính từ lúc bấm <b>“Bắt đầu”</b>. Đồng hồ vẫn chạy kể cả khi tải lại trang hoặc thoát ra.',
      'File nghe chỉ được phát <b>1 lần</b> (mỗi câu đã được đọc 2 lần trong file). Hãy đeo tai nghe và kiểm tra âm lượng trước khi bắt đầu.',
      'Bài làm được tự lưu trên máy. Hết giờ, khu vực làm bài sẽ bị khoá — bấm <b>“Nộp bài”</b> để gửi cho giáo viên.',
      'Hệ thống ghi lại số lần bạn rời khỏi trang làm bài (chuyển tab / ứng dụng).',
      'Phần Viết do giáo viên chấm. Kết quả sẽ hiện ở tab này sau khi giáo viên gửi điểm.'
    ],
    sections: [
      /* ============================ NGHE ============================ */
      {
        key: 'listen', title: 'I. NGHE (듣기)', meta: '30 điểm · 10 câu × 3 điểm', hasAudio: true,
        groups: [
          {
            instr: '※ [1~2] Nghe và chọn câu trả lời phù hợp. [Mỗi câu nghe 2 lần]',
            example: '<div class="ex-row"><span>가: 학생입니까?</span><span>나: ____________</span></div>' +
                     '<div class="ex-opts"><span class="ok">① 네, 학생입니다.</span><span>② 네, 학생이 아닙니다.</span><span>③ 아니요, 학생입니다.</span><span>④ 아니요, 선생님입니까?</span></div>',
            questions: [
              { n: 1, pts: 3, prompt: '', options: ['아니요, 회사원입니다.', '네, 회사원이 아닙니다.', '네, 회사원입니다.', '아니요, 회사원이 없습니다.'] },
              { n: 2, pts: 3, prompt: '', options: ['네, 시계가 아닙니다.', '네, 시계가 없습니다.', '아니요, 시계입니다.', '아니요, 휴대전화입니다.'] }
            ]
          },
          {
            instr: '※ [3] Đây là đâu? Nghe và chọn nơi diễn ra đoạn hội thoại. [Mỗi câu nghe 2 lần]',
            example: '<div class="ex-row"><span>가: 이 책 얼마예요?</span><span>나: 만 원이에요.</span></div>' +
                     '<div class="ex-opts"><span class="ok">① 서점</span><span>② 은행</span><span>③ 병원</span><span>④ 극장</span></div>',
            questions: [
              { n: 3, pts: 3, prompt: '', options: ['서점', '식당', '은행', '도서관'] }
            ]
          },
          {
            instr: '※ [4] Hai người đang nói về điều gì? [Mỗi câu nghe 2 lần]',
            questions: [
              { n: 4, pts: 3, prompt: '', options: ['운동', '영화', '과일', '날짜'] }
            ]
          },
          {
            instr: '※ [5~7] Nghe và trả lời câu hỏi. [Mỗi câu nghe 2 lần]',
            questions: [
              { n: 5, pts: 3, prompt: '시험은 언제입니까?', options: ['11월 14일과 15일', '11월 4일과 5일', '10월 14일과 15일', '12월 14일과 15일'] },
              { n: 6, pts: 3, prompt: '남자는 보통 몇 시에 시장에 갑니까?', options: ['새벽 4시 30분', '새벽 5시', '새벽 6시 30분', '새벽 5시 30분'] },
              { n: 7, pts: 3, prompt: '여자는 무엇을 삽니까?', options: ['모자', '바지', '바지하고 모자', '신발'] }
            ]
          },
          {
            instr: '※ [8~9] Nghe đoạn hội thoại và trả lời 2 câu hỏi. [Nghe 2 lần cho 2 câu hỏi]',
            questions: [
              { n: 8, pts: 3, prompt: '남자는 어제 어디에 갔습니까?', options: ['시장', '극장', '백화점', '수영장'] },
              { n: 9, pts: 3, prompt: '들은 내용과 같은 것을 고르십시오.', options: ['오늘은 동생 생일입니다.', '여자는 테니스를 좋아합니다.', '남자는 수영 모자를 샀습니다.', '두 사람은 내일 테니스를 칩니다.'] }
            ]
          },
          {
            instr: '※ [10] Nghe đoạn hội thoại và trả lời câu hỏi. [Nghe 2 lần]',
            questions: [
              { n: 10, pts: 3, prompt: 'Chọn câu đúng với nội dung nghe được.', options: ['여자는 여덟 시 반에 일어나요.', '여자는 오후에 숙제를 안 해요.', '여자는 저녁에 텔레비전을 봐요.', '수업은 아홉 시에 시작해요.'] }
            ]
          }
        ]
      },

      /* ============================ ĐỌC ============================ */
      {
        key: 'read', title: 'II. ĐỌC (읽기)', meta: '40 điểm · 16 câu × 2,5 điểm',
        groups: [
          {
            instr: '※ [11~12] Chọn chủ đề của nội dung sau đây giống như 〈보기〉.',
            example: '<div class="ex-row"><span>저는 베트남 사람입니다. 안 씨는 한국 사람입니다.</span></div>' +
                     '<div class="ex-opts"><span class="ok">① 국적</span><span>② 이름</span><span>③ 직업</span><span>④ 학교</span></div>',
            questions: [
              { n: 11, pts: 2.5, prompt: '사과는 싸요. 수박은 비싸요.', options: ['시간', '과일', '직업', '공부'] },
              { n: 12, pts: 2.5, prompt: '월요일에 학교에 가요. 토요일에 등산을 해요.', options: ['음식', '나라', '직업', '요일'] }
            ]
          },
          {
            instr: '※ [13~18] Chọn phương án thích hợp nhất điền vào ( ) giống như 〈보기〉.',
            example: '<div class="ex-row"><span>저는 (&nbsp;&nbsp;&nbsp;&nbsp;) 공부합니다.</span></div>' +
                     '<div class="ex-opts"><span class="ok">① 한국어를</span><span>② 한국어가</span><span>③ 한국어는</span><span>④ 한국어에</span></div>',
            questions: [
              { n: 13, pts: 2.5, prompt: '교실(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) 시계가 있습니다.', options: ['에서', '을', '에', '는'] },
              { n: 14, pts: 2.5, prompt: '저는 아침에 빵(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) 우유를 먹어요.', options: ['과', '와', '이', '를'] },
              { n: 15, pts: 2.5, prompt: '가: (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)은/는 어디입니까?<br>나: 도서관입니다.', options: ['도서관', '저것', '이것', '여기'] },
              { n: 16, pts: 2.5, prompt: '어제 친구하고 극장에서 영화를 (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;).', options: ['봐요', '봤어요', '보겠어요', '봅시다'] },
              { n: 17, pts: 2.5, prompt: '김치가 아주 매워요. 그래서 저는 김치를 먹(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;).', options: ['고 싶어요', '으세요', '지 않아요', '겠어요'] },
              { n: 18, pts: 2.5, prompt: '사과 세 ________, 커피 두 ________ 주세요.', options: ['명 / 병', '개 / 잔', '개 / 대', '마리 / 개'] }
            ]
          },
          {
            instr: '※ [19~20] Chọn câu <b>KHÔNG</b> đúng với nội dung.',
            questions: [
              { n: 19, pts: 2.5,
                context: '<table class="ex-table"><caption>한국식당 메뉴</caption>' +
                  '<tr><td>김밥</td><td>3,000원</td></tr><tr><td>라면</td><td>4,000원</td></tr>' +
                  '<tr><td>비빔밥</td><td>7,000원</td></tr><tr><td>냉면</td><td>8,000원</td></tr>' +
                  '<tr><td>콜라</td><td>1,500원</td></tr>' +
                  '<tr><td colspan="2" class="foot">영업 시간: 오전 10시 ~ 오후 9시</td></tr></table>',
                prompt: '', options: ['김밥은 삼천 원입니다.', '콜라는 이천 원입니다.', '식당은 오전 열 시에 시작합니다.', '비빔밥은 칠천 원입니다.'] },
              { n: 20, pts: 2.5,
                context: '<table class="ex-table"><caption>수빈 씨의 이번 주 계획</caption>' +
                  '<tr><td>6월 12일 (월)</td><td>도서관에서 공부</td></tr>' +
                  '<tr><td>6월 14일 (수)</td><td>말하기 시험</td></tr>' +
                  '<tr><td>6월 16일 (금)</td><td>극장에서 영화</td></tr>' +
                  '<tr><td>6월 17일 (토)</td><td>백화점에서 쇼핑</td></tr></table>',
                prompt: '', options: ['수빈 씨는 월요일에 도서관에 갑니다.', '수빈 씨는 수요일에 말하기 시험을 봅니다.', '6월 17일은 토요일입니다.', '수빈 씨는 금요일에 백화점에서 쇼핑을 합니다.'] }
            ]
          },
          {
            instr: '※ [21~22] Đọc đoạn văn sau và chọn câu có nội dung phù hợp.',
            questions: [
              { n: 21, pts: 2.5,
                context: '<div class="ex-passage">저는 흐엉입니다. 베트남 사람입니다. 지금 한국대학교에서 한국어를 배웁니다. 저는 대학교 기숙사에서 삽니다.</div>',
                prompt: '', options: ['흐엉 씨는 한국 사람입니다.', '흐엉 씨는 기숙사에서 삽니다.', '흐엉 씨는 한국어 선생님입니다.', '흐엉 씨는 회사에 다닙니다.'] },
              { n: 22, pts: 2.5,
                context: '<div class="ex-passage">지난 주말에 친구하고 동대문시장에 갔습니다. 시장에 사람이 아주 많았습니다. 가방이 예뻤습니다. 하지만 비쌌습니다. 그래서 저는 티셔츠를 샀습니다.</div>',
                prompt: '', options: ['지난 주말에 백화점에 갔습니다.', '시장에 사람이 적었습니다.', '저는 티셔츠를 샀습니다.', '저는 가방을 샀습니다.'] }
            ]
          },
          {
            instr: '※ [23] Đọc đoạn văn sau và chọn ý chính.',
            questions: [
              { n: 23, pts: 2.5,
                context: '<div class="ex-passage">저는 한국 음식을 좋아합니다. 불고기하고 비빔밥을 자주 먹습니다. 다음 달에 한국에 갑니다. 한국에서 한국 음식을 많이 먹고 싶습니다.</div>',
                prompt: '', options: ['한국에서 한국 음식을 먹고 싶습니다.', '비빔밥이 아주 맵습니다.', '한국 음식이 비쌉니다.', '다음 달에 베트남에 갑니다.'] }
            ]
          },
          {
            instr: '※ [24~26] Đọc đoạn văn sau và trả lời câu hỏi. (다음을 읽고 물음에 답하십시오.)',
            context: '<div class="ex-passage">저는 김민재입니다. 회사원입니다. 평일에는 아침 일곱 시에 일어납니다. 여덟 시에 회사에 출근합니다. 일은 아홉 시에 시작합니다. 그리고 오후 여섯 시에 끝납니다. 저녁에는 헬스클럽에서 운동을 합니다.<br>' +
                     '주말에는 회사에 ( ㉠ ). 토요일에는 친구하고 같이 산에 갑니다. 일요일에는 집에서 쉽니다. 책을 읽습니다. 그리고 음악을 듣습니다. 지난 토요일에도 친구하고 산에 갔습니다. 정말 재미있었습니다.</div>',
            questions: [
              { n: 24, pts: 2.5, prompt: 'Chọn đáp án thích hợp điền vào ㉠.', options: ['갑니다', '가겠습니다', '가지 않습니다', '가고 싶습니다'] },
              { n: 25, pts: 2.5, prompt: '민재 씨는 몇 시에 일이 끝납니까?', options: ['오전 7시', '오전 9시', '오후 7시', '오후 6시'] },
              { n: 26, pts: 2.5, prompt: 'Chọn đáp án đúng với nội dung của đoạn văn trên.', options: ['민재 씨는 평일 저녁에 운동을 합니다.', '민재 씨는 학생입니다.', '민재 씨는 일요일에 산에 갑니다.', '민재 씨는 지난 토요일에 집에서 쉬었습니다.'] }
            ]
          }
        ]
      },

      /* ============================ VIẾT ============================ */
      {
        key: 'write', title: 'III. VIẾT (쓰기)', meta: '30 điểm · tự luận (giáo viên chấm)',
        groups: [
          {
            instr: '※ [27~28] Viết vào ㉠, ㉡ mỗi chỗ MỘT câu phù hợp. (mỗi chỗ trống 3 điểm)',
            questions: [
              { n: 27, pts: 6, type: 'blanks', blanks: [{ id: '27a', label: '㉠', pts: 3 }, { id: '27b', label: '㉡', pts: 3 }],
                context: '<div class="ex-passage ex-letter">수빈 씨, 안녕하세요?<br>이번 주 토요일에 시간이 있어요? 저는 토요일 오후에 백화점에 가겠어요.<br>백화점에서 가방을 ( ㉠ ). 수빈 씨도 시간이 있어요?<br>그럼 우리 같이 ( ㉡ ). 오후 두 시에 백화점에서 만나요.<div class="sign">— 유나 —</div></div>',
                prompt: '(6 điểm)' },
              { n: 28, pts: 6, type: 'blanks', blanks: [{ id: '28a', label: '㉠', pts: 3 }, { id: '28b', label: '㉡', pts: 3 }],
                context: '<div class="ex-passage">어제는 일요일이었습니다. 저는 아침 열 시에 ( ㉠ ).<br>그리고 친구하고 식당에서 점심을 먹었습니다. 불고기가 아주 ( ㉡ ).<br>오후에는 집에서 쉬었습니다.</div>',
                prompt: '(6 điểm)' }
            ]
          },
          {
            instr: '※ [29] Viết một đoạn văn khoảng 5~7 câu (từ 150 đến 250 ký tự) theo chủ đề dưới đây. (18 điểm)',
            questions: [
              { n: 29, pts: 18, type: 'essay', id: '29', minChars: 150, maxChars: 250,
                context: '<div class="ex-passage"><b>주제: 나의 주말 (Cuối tuần của tôi)</b><br>• 보통 주말에 무엇을 해요?<br>• 지난 주말에 어디에서 누구하고 무엇을 했어요? 무엇을 안 했어요? 어땠어요?<br>• 이번 주말에 무엇을 하고 싶어요? 무엇을 안 하고 싶어요?<br><i>(Gợi ý: dùng -았/었-, -고 싶다, 에서, 하고, 을/를 …)</i></div>',
                prompt: '' }
            ]
          }
        ]
      }
    ],
    // Thang chấm phần Viết (hiện cho giáo viên khi chấm)
    rubric: {
      '27a': '사고 싶어요 / 사겠어요 (chấp nhận: 사고 싶습니다, 보고 싶어요 …)',
      '27b': '갑시다 / 백화점에 갑시다 / 쇼핑합시다 — bắt buộc -(으)ㅂ시다 vì có “우리 같이”',
      '28a': '일어났습니다 (chấp nhận: 일어났어요, 아침을 먹었습니다 …) — phải thì quá khứ',
      '28b': '맛있었습니다 (chấp nhận: 맛있었어요) — phải thì quá khứ',
      '27_28': '3đ đúng nội dung + ngữ pháp + đuôi câu · 2đ đúng ý, 1 lỗi nhỏ · 1đ đúng ý nhưng sai ngữ pháp trọng tâm · 0đ không phù hợp/bỏ trống',
      '29': 'Nội dung & nhiệm vụ 6đ · Từ vựng & ngữ pháp 8đ · Tổ chức & chính tả 4đ. 16–18 rất tốt · 12–15 tốt · 8–11 đạt · <8 chưa đạt. Dưới 3 câu: tối đa 6đ.'
    }
  },

  // 🏁 CUỐI KỲ — chưa có đề. Khi có đề, thêm vào đây theo cùng cấu trúc với "mid"
  //    (và thêm đáp án vào EXAM_KEYS.final trong backend).
  final: null
};
