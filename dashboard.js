function initDashboard() {
    const categoryMap = {
        'הבחירות שלי': 0, 'שיתופיות': 1, 'אינטראקטיביות': 2, 'עיצוב ויצירה': 3, 'משחקים': 4,
        'כלים שעושים חיים קלים': 5, 'מאגרי מדיה': 6, 'כלי גוגל': 7, 'סימולציות': 8
    };

    const categoryStyles = {
        'הבחירות שלי': { color: '#10b981' },
        'שיתופיות': { color: '#22d3ee' }, 'אינטראקטיביות': { color: '#10b981' },
        'עיצוב ויצירה': { color: '#f43f5e' }, 'משחקים': { color: '#6366f1' },
        'כלים שעושים חיים קלים': { color: '#f59e0b' }, 'מאגרי מדיה': { color: '#d946ef' },
        'כלי גוגל': { color: '#8b5cf6' }, 'סימולציות': { color: '#BED4CB' }, 
        'default': { color: '#3b82f6' }
    };
const presentations = [
        { id: 1, title: "Padlet", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1EJkXEIy4E1De2FD1pdPY8Ux9jPEQIHe5/view?usp=sharing", siteUrl: "https://padlet.com", description: "לוח קיר דיגיטלי לריכוז רעיונות ותוצרים ויזואליים בזמן אמת.", info: "• ניהול סיעור מוחות כיתתי: כולם כותבים בו-זמנית על קיר אחד משותף.\n• איסוף תוצרי למידה: ריכוז תמונות, קבצים, קישורים וסרטונים שיצרו התלמידים במקום אחד.\n• הערכת עמיתים (Peer Assessment): התלמידים יכולים להגיב זה לזה, לסמן 'לייק' ולדרג עבודות.\n• ארגון מידע במבנה גמיש: ניתן לסדר את הלוח כמפה, כציר זמן, כטורים או כקיר חופשי.\n• שימוש בפורמט 'טורים' לניהול שלבים בפרויקטים כיתתיים (K-W-L).\n• הלוח נשמר לאורך זמן וניתן להטמעה באתר הכיתה או ב-Google Classroom." },
        { id: 2, title: "ThingLink", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/1_TS0ZEg3vJW2uPbbnO12vneIdTavgLz6/view?usp=sharing", siteUrl: "https://www.thinglink.com", description: "הפוך כל תמונה למפת למידה אינטראקטיבית עם נקודות מידע.", info: "• העשרת תמונות: הוספת נקודות חמות (Hotspots) הכוללות טקסט, אודיו, וידאו וקישורים.\n• סיורים וירטואליים: יצירת חווית למידה סוחפת באמצעות תמונות 360 מעלות.\n• 'מפות ידע': בניית סביבה שבה הלומד חוקר את החומר בקצב אישי ובאופן לא לינארי.\n• הנגשת תוכן: שימוש בכלי Immersive Reader להקראת הטקסט בתוך הנקודות.\n• תוצרי תלמידים: פלטפורמה מצוינת להצגת פרויקטי חקר על גבי מפה או אינפוגרפיקה." },
        { id: 34, title: "Google Keep", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1gZaplTezjXfM3xSXFPeqb2HUfgWT8ery/view?usp=drive_link", siteUrl: "https://keep.google.com", description: "פנקס רשימות דיגיטלי לניהול רעיונות ותזכורות.", info: "• ארגון אישי: יצירת פתקיות צבעוניות ורשימות תיוג (To-Do Lists) לניהול משימות יומיות.\n• סנכרון מלא: המידע נגיש מהטלפון ומהמחשב בכל רגע נתון ובזמן אמת.\n• מולטימדיה: הוספת תמונות, הקלטות קוליות (עם תמלול אוטומטי) ושרבוטים לפתקים.\n• חילוץ טקסט (OCR): צילום מסמך והפיכתו לטקסט חי הניתן לעריכה בגוגל דוקס.\n• עבודה שיתופית: שיתוף פתקים עם עמיתים לתכנון משותף של מערכי שיעור או משימות צוות.\n• תזכורות חכמות: הגדרת תזכורות לפי זמן או לפי מיקום גיאוגרפי." },
        { id: 35, title: "Google Tasks", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1U-2v9ww4vafP6P4cDyUZ4Y2Jwdpk-GlM/view?usp=drive_link", siteUrl: "https://tasks.google.com", description: "ניהול משימות פשוט וממוקד המוטמע בתוך המייל והיומן.", info: "• ניהול זמן: יצירת רשימות משימות מהירות לניהול שוטף של העבודה הפדגוגית והאדמיניסטרטיבית.\n• שילוב עם Gmail: הפיכת אימיילים למשימות בתוך Gmail בלחיצת כפור.\n• שילוב עם Calendar: הגדרת תאריכי יעד למשימות, שיופיעו אוטומטית ביומן שלכם.\n• ארגון היררכי: פירוט משימות גדולות לתת-משימות קטנות וברות ביצוע.\n• כלי עזר לתלמידים: פיתוח מיומנויות של ניהול זמן והתארגנות עצמית בלמידה מרחוק או בפרויקטים." },
        { id: 36, title: "Google Sites", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1od4KE3XRaA_71InAjECTQnY864o-DZaK/view?usp=drive_link", siteUrl: "https://sites.google.com", description: "בניית אתרים פשוטה ואינטואיטיבית ללא צורך בכתיבת קוד.", info: "• מרכזי למידה: יצירת אתר המרכז את כל חומרי הלימוד והמשימות עבור נושא מסוים.\n• אתר כיתה: בניית פלטפורמה לתקשורת עם הורים ותלמידים המציגה לוחות זמנים והודעות.\n• פורטפוליו דיגיטלי: תלמידים בונים אתר אישי המציג את ההתקדמות והתוצרים שלהם לאורך השנה.\n• ממשק גרירה והשלכה: הטמעה קלה של קבצי Drive, מצגות וסרטוני YouTube.\n• תצוגה מותאמת: האתר נראה מצוין בטלפונים, טאבלטים ומחשבים באופן אוטומטי.\n• הרשאות: שליטה מלאה על מי יכול לצפות באתר (ציבורי או רק בתוך חשבון הארגון)." },
        { id: 37, title: "Google Gemini", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1Jkq0NO9GQ2IgdfiWsdDPFv_ctPCoOfeh/view?usp=drive_link", siteUrl: "https://gemini.google.com", description: "עוזר בינה מלאכותית (AI) רב-תחומי ליצירת תוכן ומחקר.", info: "• סיעור מוחות פדגוגי: קבלת רעיונות למערכי שיעור יצירתיים, פתיחות מעניינות ומשימות חקר.\n• כתיבת תוכן: ניסוח מיילים להורים, כתיבת סיפורים קצרים או פישוט טקסטים מורכבים.\n• ניתוח נתונים: העלאת קבצים וקבלת סיכומים, ניתוח טבלאות ומציאת מגמות.\n• Imagen 3: יצירת איורים ותמונות מקוריות לשימוש במצגות ובחומרי לימוד.\n• בינה מלאכותית אחראית: כלי עזר רב עוצמה לשיפור היעילות והיצירתיות של המורה." },
        { id: 40, title: "Nano Banana", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1qaGQFcsYv12G32TNnCrdTmsuQuakLQ1U/view?usp=drive_link", siteUrl: "https://gemini.google.com", description: "המודל המתקדם של גוגל ליצירת תמונות מרהיבות מטקסט.", info: "• המחשה ויזואלית: יצירת תמונות ריאליסטיות או איורים המבוססים על תיאור מילולי בלבד.\n• שדרוג חומרי למידה: הוספת תוכן ויזואלי ייחודי ומקורי למצגות ודפי עבודה ואתרי Sites.\n• פיתוח דמיון: תלמידים כותבים הנחיות (Prompts) כדי לראות איך התיאור שלהם הופך ליצירה.\n• התאמת סגנון: ניתן לבקש תמונות בסגנונות אמנותיים שונים (ציור שמן, קומיקס, צילום היסטורי ועוד).\n• פתרון מהיר: אין צורך לחפש שעות במנועי חיפוש – פשוט מתארים ומקבלים תמונה מדויקת." },
        { id: 41, title: "Google Gems", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1Jkq0NO9GQ2IgdfiWsdDPFv_ctPCoOfeh/view?usp=drive_link", siteUrl: "https://gemini.google.com/gems", description: "בניית מומחי AI מותאמים אישית לצרכים פדגוגיים ספציפיים.", info: "• מומחים נושאיים: יצירת 'ג'ם' המתמחה במקצוע מסוים (למשל: בוט המתמחה בפיזיקה).\n• הנחיות קבועות: הגדרת 'חוקי משחק' ל-AI כך שתמיד יענה בטון מסוים או ברמת שפה מוגדרת.\n• עוזר הוראה: בניית בוט שעוזר למורה בבדיקת עבודות לפי מחוון ספציפי.\n• תמיכה בתלמידים: יצירת Gems המשמשים כחונכים אישיים לתלמידים בנושאים ממוקדים.\n• שיתוף: ניתן לשתף את ה-Gems שנוצרו עם מורים אחרים בבית הספר." },
        { id: 42, title: "Google Earth", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1eNzEVxvUDarurT1q1Op0zSSZLTmBQ2Fe/view?usp=drive_link", siteUrl: "https://earth.google.com", description: "חקר העולם בתלת-ממד, סיורים וירטואליים ומפות היסטוריות.", info: "• חקר גיאוגרפי: סיור בכל נקודה על פני הגלובוס בתצוגת תלת-ממד מרהיבה לשיעורי גיאוגרפיה.\n• Voyager: גישה לסיורים לימודיים מובנים שהוכנו ע\"י מומחים בנושאי טבע והיסטוריה.\n• Timelapse: צפייה בשינויים שעבר כדור הארץ ב-40 השנים האחרונות (המסת קרחונים, צמיחת ערים).\n• מדידות: כלי למדידת מרחקים ושטחים המאפשר חיבור לשיעורי מתמטיקה בצורה מוחשית.\n• פרויקטים: תלמידים יכולים ליצור 'סיפור מפה' הכולל נקודות ציון עם טקסט ותמונות משלהם." },
        { id: 38, title: "Google Vids", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/18OTH4Y6Q5S59IR2pZciMtWMEEO2UCv1g/view?usp=drive_link", siteUrl: "https://vids.google.com", description: "אפליקציה ליצירת סרטוני עבודה והדרכה מבוססת בינה מלאכותית.", info: "• יצירת סרטונים מהירה: ה-AI עוזר לבנות תסריט (Script) וסטוריבורד (Storyboard) על סמך נושא.\n• עריכה פשוטה: ממשק המבוסס על שקפים (דומה ל-Slides) מה שהופך את העריכה לקלה במיוחד.\n• קריינות (Voiceover): הוספת קריינות אוטומטית במגוון קולות או הקלטה עצמית בתוך הכלי.\n• תוצרי למידה: תלמידים יכולים להגיש עבודות בפורמט וידאו מקצועי במקום מצגת סטטית.\n• שיתוף בטוח: הסרטונים נשמרים ב-Drive וניתנים לשיתוף מוגן בתוך הארגון." },
        { id: 39, title: "NotebookLM", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1rugVVLRSUFbrk--CjkZOraXCWlzalPb3/view?usp=drive_link", siteUrl: "https://notebooklm.google.com", description: "עוזר מחקר אישי מבוסס AI המשתמש במסמכים שלכם כמקור ידע.", info: "• מחקר מבוסס מקורות: בניגוד ל-AI כללי, NotebookLM עונה רק על סמך המסמכים שהעליתם.\n• סיכומים חכמים: יצירת סיכומי למידה, מדריכי לימוד ושאלות חזרה אוטומטיות מהחומר הלימודי.\n• פודקאסט שמע: הפיכת מסמכים משעממים לשיחה קולית מרתקת בין שני קריינים (Audio Overview).\n• ארגון ידע: ריכוז של עשרות קבצי PDF ומאמרים לתוך מרחב עבודה אחד חכם.\n• דיוק אקדמי: הכלי מספק הערות שוליים המפנות בדיוק למקום במסמך שממנו נלקח המידע." },
        { id: 27, title: "אורט קמפוס", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/1yjxfdbD3IVMULEEtEGH86pjSzf0lUFg2/view?usp=sharing", siteUrl: "https://campus.ort.org.il/", description: "הקמפוס הווירטואלי של רשת אורט. פלטפורמה לניהול למידה.", info: "• קורסים דיגיטליים: גישה למאות קורסים במקצועות הליבה וההרחבה המותאמים לתכנית הלימודים.\n• Moodle מבוסס: מערכת ניהול למידה (LMS) מתקדמת המאפשרת הגשת משימות ומעקב אחר ציונים.\n• אינטגרציה: כניסה אחידה (SSO) באמצעות חשבון אורט לכל המערכות.\n• מרחב מורה: יכולת של המורה לנהל קבוצות לימוד ספציפיות, לראות את התקדמות התלמידים ולתת משוב.\n• למידה עצמאית: תלמידים יכולים להתקדם בקצב שלהם ביחידות לימוד אינטראקטיביות." },
        { id: 3, title: "Mentimeter", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1ocybR8PcGro2Ue6GyS4a8FgwhDWB9Gzx/view?usp=sharing", siteUrl: "https://www.mentimeter.com", description: "מצגות אינטראקטיביות לשיתוף קהל ומשוב חי במגוון סקרים.", info: "• מעורבות (Engagement): הפיכת הקהל ממשתתף פסיבי לאקטיבי באמצעות שאלות ותגובות בלייב.\n• ענני מילים (Word Clouds): כלי מצוין לסיעור מוחות כיתתי המציג את המילים הנפוצות בצורה ויזואלית.\n• סקרים ובחנים: קיום הצבעות או בחנים מהירים בתוך המצגת עם תוצאות המוצגות באופן מיידי.\n• אנונימיות: מאפשר לתלמידים ביישנים להביע את דעתם או לשאול שאלות ללא חשש.\n• סיכום שיעור: קבלת רפלקציה מהירה מהתלמידים על הבנת החומר בסוף השיעור." },
        { id: 4, title: "Canva", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1cDj4dBegxxz_0x3Q0n4_QaefX196Gqy8/view?usp=sharing", siteUrl: "https://www.canva.com", description: "פלטפורמת עיצוב גרפי ליצירת מצגות ותוכן ויזואלי.", info: "• עיצוב מקצועי בקלות: שימוש באלפי תבניות מוכנות לפוסטרים, מצגות, דפי עבודה ותעודות.\n• Canva for Education: גישה מלאה לכל הכלים המתקדמים (Premium) בחינם למורים ותלמידים.\n• עבודה שיתופית: תלמידים יכולים לעבוד על אותו עיצוב בו-זמנית מבתיהם.\n• וידאו ואנימציה: יצירת סרטוני הדרכה ואינפוגרפיקות מונפשות בצורה פשוטה.\n• בינה מלאכותית: כלי ה-Magic Studio מאפשרים הסרת רקע, יצירת תמונות וכתיבת טקסטים בתוך העיצוב.", guideUrl: "https://www.canva.com/design/DAFRIjc8RoE/ByM_PVHabX08_95vrE-03A/view?utm_content=DAFRIjc8RoE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc086b04346" },
        { id: 18, title: "Photopea", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1w1bpkfQJyLOPvlsAG6YHxabKc39PLOyv/view?usp=sharing", siteUrl: "https://www.photopea.com", description: "עורך תמונות מקצועי וחינמי בדפדפן, תואם פוטושופ.", info: "• עריכה מקצועית: עבודה עם שכבות (Layers), מסכות (Masks), ופילטרים מתקדמים.\n• תמיכה מלאה בקבצי Photoshop (PSD) ופורמטים מקצועיים.\n• חינמי לחלוטין: כל היכולות של תוכנות עיצוב יקרות בתוך הדפדפן ללא צורך בהתקנה.\n• לימודי עיצוב: כלי מושלם ללימוד עקרונות הגרפיקה המקצועית בבתי ספר.\n• תיקון תמונות: שיקום צבעים, הסרת פגמים ושדרוג איכות התמונה בקלות.\n• תמיכה מלאה בעברית ובפונטים עבריים." },
        { id: 33, title: "Figma", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1K5kVSCYpnKUUf8KtB-q8EOvODL5s8jOk/view?usp=drive_link", siteUrl: "https://www.figma.com", description: "פלטפורמה מקצועית לעיצוב ממשקים (UI/UX) ושיתוף פעולה ויזואלי.", info: "• עיצוב מוצר: בניית אבות-טיפוס (Prototypes) של אפליקציות ואתרי אינטרנט.\n• FigJam: לוח לבן שיתופי (Whiteboard) המיועד לסיעור מוחות, מיפוי תהליכים ומשחקי חשיבה.\n• שיתופיות בזמן אמת: עבודה של עשרות תלמידים יחד על אותו קובץ עיצוב.\n• ספריות עיצוב: יצירת רכיבים (Components) שניתן לעשות בהם שימוש חוזר לאורך כל הפרויקט.\n• חדשנות: הכלי המוביל בעולם כיום לעיצוב חוויית משתמש ופיתוח רעיונות טכנולוגיים." },
        { id: 31, title: "Tinkercad", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1ZbsYfD5GEP298ccEJWdb3UdsPKDGjsyD/view?usp=sharing", siteUrl: "https://www.tinkercad.com", description: "פלטפורמה לתכנון בתלת-ממד ועיצוב מעגלים אלקטרוניים.", info: "• עיצוב 3D: בניית מודלים תלת-ממדיים פשוטים ומורכבים המיועצאים להדפסת תלת-ממד.\n• סימולציית מעגלים: תכנון ובדיקת מעגלים אלקטרוניים הכוללים ארדואינו (Arduino) בתוך סביבה בטוחה.\n• Codeblocks: יצירת צורות גיאומטריות באמצעות כתיבת קוד בלוקים (דומה ל-Scratch).\n• ניהול כיתה: המורה יכול לראות את כל הפרויקטים של התלמידים בזמן אמת בלוח בקרה אחד.\n• לימוד פיזיקה: כלי מצוין להמחשת מושגים בחשמל, הנדסה וגיאומטריה מרחבית." },
        { id: 6, title: "Genially", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/11lWrpl9ZwvyuED-13lEyh06SIAOHTaAx/view?usp=sharing", siteUrl: "https://genial.ly", description: "יצירת מצגות, משחקים ואינפוגרפיקות אינטראקטיביות.", info: "• גיימיפיקציה: בניית חדרי בריחה דיגיטליים (Escape Rooms) ומשחקי למידה מורכבים.\n• אינפוגרפיקות חיות: יצירת תרשימים ודיאגרמות שמתעוררים לחיים בלחיצה או בריחוף עכבר.\n• מצגות אינטראקטיביות: המצגת הופכת לאתר קטן שבו המשתמש בוחר את נתיב ההתקדמות.\n• תבניות מוכנות: שימוש במאות תבניות למשחקי טריוויה, 'מי רוצה להיות מיליונר' ועוד.\n• הטמעה: ניתן להטמיע את התוצרים בקלות בכל פלטפורמת למידה (Classroom, Moodle, Sites)." },
        { id: 5, title: "Kahoot!", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1v5jVMrb3jEtjNpRVX7Qs8eDKrtb5zij8/view?usp=sharing", siteUrl: "https://kahoot.com", description: "הפוך למידה למשחק דרך חידונים תחרותיים.", info: "• למידה חווייתית: הפיכת בדיקת הידע לתחרות מותחת ומהנה המעוררת את כל הכיתה.\n• חידונים מהירים: יצירת שאלות טריוויה (אמריקאיות) עם מוזיקה ואפקטים קצביים.\n• בדיקת הבנה: כלי מצוין לסיכום פרק או בדיקת ידע קודם בתחילת נושא חדש.\n• דוחות: קבלת ניתוח מפורט בסוף המשחק המראה היכן התלמידים התקשו ומי זקוק לחיזוק.\n• בנק שאלות: שימוש במיליוני חידונים מוכנים שנוצרו ע\"י קהילת המורים העולמית." },
        { id: 13, title: "Quizizz", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1uZ1NXKhmRR5ZQKnpuhGDay1HwLDXdSwL/view?usp=sharing", siteUrl: "https://quizizz.com", description: "חידונים בקצב אישי הכוללים דוחות התקדמות וממים משעשעים.", info: "• קצב אישי: התלמידים עונים על השאלות בקצב שלהם מהמכשיר האישי.\n• שיעור אינטראקטיבי: שילוב שקפי תוכן יחד עם שאלות בחינה בתוך מצגת אחת.\n• הנגשה: הכלי כולל הקראת שאלות בקול לטובת תלמידים עם קשיי קריאה.\n• ממים והומור: שילוב של תמונות משעשעות לאחר כל תשובה להגברת ההנאה בלמידה.\n• שיעורי בית: אפשרות לשליחת החידון כמשימה לבית עם דד-ליין מוגדר ודיווח אוטומטי." },
        { id: 16, title: "Baamboozle", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1W0FoGzCh50iKb1ko4UD7R5WKoC0CSUlN/view?usp=sharing", siteUrl: "https://www.baamboozle.com", description: "משחקי צוותים ללא צורך במכשירים אישיים, מושלם לחימום כיתתי.", info: "• פשטות: אין צורך שלכל תלמיד יהיה טלפון או מחשב – כולם משחקים מול המסך המרכזי.\n• גיבוש כיתתי: חלוקת הכיתה לצוותים המתחרים זה בזה ומעודדים זה את זה.\n• אלמנט ההפתעה: 'קלפי כוח' שיכולים להוסיף או להוריד נקודות באופן מפתיע משנים את מאזן הכוחות.\n• יצירה מהירה: יצירת משחק תוך דקה אחת בלבד באמצעות שאלות פשוטות.\n• הפוגה וחימום: כלי מושלם לפתיחת שיעור או למשחק של 5 דקות לפני הצלצול." },
        { id: 17, title: "Nearpod", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1vZDlkiWFT-QzLBNmWiemms6ZxTipCiCz/view?usp=sharing", siteUrl: "https://nearpod.com", description: "שיעורים אינטראקטיביים המשלבת מצגות, משחקים ומציאות מדומה.", info: "• שליטה מלאה: המורה מעביר את השקפים במכשירים של כל התלמידים בו-זמנית.\n• מגוון פעילויות: ציור על המסך, שאלות פתוחות, התאמת זוגות, שיתוף לוח מודעות ועוד.\n• מציאות מדומה (VR): יציאה לסיורים וירטואליים באתרים מסביב לעולם ישירות מהמצגת.\n• Time to Climb: משחק תחרותי המעוצב כמרוץ במעלה ההר לסיכום השיעור.\n• משוב בזמן אמת: המורה רואה את התשובות של כולם על המסך שלו ויכול לתת התייחסות מיידית." },
        { id: 20, title: "Flippity", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1EquhXBSUh1gzf8-G08hjNjJmq-H6yOoU/view?usp=drive_link", siteUrl: "https://www.flippity.net", description: "הפוך גליונות גוגל למשחקים כמו גלגלי מזל וחדרי בריחה.", info: "• פתרון טכנולוגי פשוט: הכנסת נתונים לתוך גליון Google Sheets הופכת אותם למשחק מעוצב.\n• גלגל מזל: כלי לבחירה אקראית של שמות תלמידים להשתתפות בשיעור.\n• כרטיסיות זיכרון: למידת מושגים ושפות באמצעות כרטיסיות אינטראקטיביות הכוללות שמע ותמונות.\n• מנעולי פריצה: יצירת חדרי בריחה דיגיטליים המבוססים על פתרון חידות טקסטואליות.\n• אין צורך בהרשמה: התלמידים פשוט מקבלים קישור ומתחילים לשחק ללא פרוצדורה מסובכת." },
        { id: 10, title: "Wordwall", category: "משחקים", driveUrl: "https://drive.google.com/file/d/16Kaql2LZyy9-VCAUuoOBBFyEMwqMmLAV/view?usp=drive_link", siteUrl: "https://wordwall.net", description: "יצירת פעילויות מותאמות אישית במגוון תבניות משחק.", info: "• מגוון תבניות: המרת אותו תוכן למגוון משחקים (מבוך, התאמת זוגות, גלגל מזל, בלונים ועוד).\n• המרה בלחיצה: ניתן להחליף את סוג המשחק בכל רגע מבלי להקליד מחדש את השאלות.\n• גרסאות להדפסה: ניתן להוריד את המשחקים כדפי עבודה בפורמט PDF לשימוש פיזי בכיתה.\n• לוח תוצאות: ניהול טבלת שיאים המעודדת את התלמידים לחזור על המשימה שוב ושוב.\n• קהילת מורים: גישה למאגר אדיר של משחקים מוכנים שניתן לערוך ולהתאים אישית." },
        { id: 11, title: "Classroomscreen", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1pJDqx_K1ZKV-bEtRGHj6Sx8YUgcwuwC6/view?usp=sharing", siteUrl: "https://classroomscreen.com", description: "ניהול מסך הכיתה עם כלים כמו טיימר, רמות רעש וקודי QR.", info: "• ארגון המסך: הצגת כל ההנחיות והכלים לשיעור על מסך אחד מעוצב (טיימר, לוח, קודי QR).\n• מד רעש: כלי ויזואלי המראה לתלמידים את עוצמת הדיבור שלהם ומסייע בשמירה על השקט.\n• שפת סימנים ויזואלית: הצגת סמלים המגדירים את אופן העבודה (שקט, לחישה, עבודה בזוגות).\n• קודי QR: יצירה והצגה מהירה של קודי גישה לאתרים או סרטונים עבור התלמידים מהלוח.\n• ניהול זמן: שעון חול וטיימר בולטים המסייעים בניהול זמן המשימות בכיתה." },
        { id: 32, title: "Classe", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1-A4JjSMc5G3XhFszhUiPaEdp7V0P7UZh/view?usp=sharing", siteUrl: "https://www.classe.world", description: "מערכת לניהול כיתה חכם, הכוללת מפות הושבה וניהול למידה.", info: "• מפת הושבה דינמית: בניית סידור ישיבה חכם המבוסס על הצרכים הלימודיים והחברתיים של התלמידים.\n• חלוקה לקבוצות: יצירת צוותי עבודה הומוגניים או הטרוגניים בלחיצת כפתור אחת.\n• מעקב השתתפות: סימון השתתפות והתנהגות תלמידים במהלך השיעור בצורה דיגיטלית ומהירה.\n• הגרלת תלמידים: בחירה הוגנת של תלמידים להשתתפות ללא הטיות.\n• ניתוח נתוני כיתה: קבלת תובנות על הדינמיקה הכיתתית והתקדמות התלמידים לאורך זמן." },
        { id: 7, title: "remove.bg", category: "כלים שעושים חיים קלים", driveUrl: "", siteUrl: "https://www.remove.bg", description: "הסרת רקע מתמונות בתוך שניות בעזרת בינה מלאכותית.", info: "• הסרה אוטומטית: ניקוי הרקע מכל תמונה בתוך שניות ללא צורך בידע גרפי כלל.\n• עיצוב נקי: יצירת קבצי PNG שקופים שמשתלבים מצוין בתוך מצגות, אתרים וכרזות.\n• חיסכון בזמן: הכלי חוסך למורה שעות של עבודה ידנית בתוכנות עריכה מורכבות.\n• אפשרות להחלפת הרקע הקיים ברקע חדש מתוך מאגר מובנה.\n• כלי חיוני לשיפור הנראות הויזואלית של תוצרי תלמידים." },
        { id: 8, title: "iLovePDF", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1KOA268-vL0hoBkxBhtFtyqWitg5Oz5kY/view?usp=sharing", siteUrl: "https://www.ilovepdf.com", description: "סט כלים לניהול, המרה ועריכת קבצי PDF בקלות.", info: "• מיזוג ופיצול: חיבור מספר קבצי PDF לקובץ אחד מסודר או פירוק קובץ למשימות נפרדות.\n• המרת קבצים: הפיכת PDF ל-Word, PowerPoint או Excel ולהיפך לצורך עריכה.\n• דחיסה (Compress): הקטנת גודל הקובץ כדי שניתן יהיה לשלוח אותו בקלות במייל או בוואטסאפ.\n• עריכה: הוספת טקסט, תמונות, חתימות ומספרי עמודים לקבצי PDF קיימים." },
        { id: 28, title: "123Apps", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1LufYcD-Ok5nuWM_inhMN612JbjHmjEZl/view?usp=sharing", siteUrl: "https://123apps.com/", description: "סט כלים מקוון לעריכת וידאו, אודיו וניהול PDF.", info: "• עריכת וידאו: חיתוך סרטונים, הוספת כתוביות, שינוי מהירות וסיבוב התמונה ללא התקנת תוכנה.\n• עריכת אודיו: חיתוך קטעי קול והפיכת וידאו (MP4) לקבצי שמע (MP3).\n• הקלטה: הקלטה מסך המחשב להכנת סרטוני הדרכה או הקלטת קול ישירות מהדפדפן.\n• המרת פורמטים: המרה בין עשרות סוגי קבצים (תמונות, מסמכים, ארכיון ZIP).\n• כלי עזר חינמיים: פתרון מלא לכל הצרכים הטכניים היומיומיים של המורה והתלמיד במקום אחד." },
        { id: 30, title: "TinyWow", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1PgRcU5CiKHKVJFKgTCjT4vCDFbPPHeMW/view?usp=drive_link", siteUrl: "https://tinywow.com/", description: "מאות כלים חינמיים לטיפול בקבצים, תמונות, וידאו וכתיבה.", info: "• כלי AI: כתיבת טקסטים, שיפור ניסוחים ויצירת פסקאות שלמות בעזרת בינה מלאכותית.\n• עריכת תמונות: הסרת אלמנטים לא רצויים מתמונות (Object Removal) וטשטוש רקעים.\n• ניהול PDF: הוספת חתימה, מיזוג, פיצול והמרת טבלאות PDF ל-Excel בצורה חכמה.\n• חילוץ טקסט (OCR): הפיכת תמונות או מסמכים סרוקים לטקסט חי הניתן לעריכה.\n• אין הגבלות: מאות כלים שזמינים ללא הרשמה וללא תשלום, הכל תחת קורת גג אחת." },
        { id: 9, title: "Pixabay", category: "מאגרי מדיה", driveUrl: "https://drive.google.com/file/d/1S_HBANOnFfFrMjtJ_q7l5tf_JKqu2s1W/view?usp=sharing", siteUrl: "https://pixabay.com", description: "מאגר תמונות וסרטונים לשימוש חופשי ללא זכויות יוצרים.", info: "• מאגר ענק: גישה למיליוני תמונות, איורים, וקטורים, סרטונים ומוזיקה באיכות גבוהה מאוד.\n• זכויות יוצרים: כל המדיה בחינם לשימוש מסחרי וחינוכי (CC0), מה שמונע בעיות משפטיות.\n• חיפוש נוח: אפשרות לחיפוש בעברית ובאנגלית ומציאת מדיה לפי צבעים או גודל.\n• איכות: הורדת קבצים ברזולוציות שונות בהתאם לצורך (מצגת קלה או הדפסת פוסטר).\n• סאונד: מאגר מוזיקת רקע ואפקטים קוליים לשימוש בסרטוני הדרכה ופרויקטים של תלמידים." },
        { id: 12, title: "Unsplash", category: "מאגרי מדיה", driveUrl: "https://drive.google.com/file/d/1F-ZV_XWo3fQKpTRmCv1UAxb9kOL8HVc4/view?usp=sharing", siteUrl: "https://unsplash.com", description: "מאגר צילומי אמנותיים ואיכותיים ברזולוציה גבוהה.", info: "• צילום אמנותי: מאגר המבוסס על צלמים מקצועיים מרחבי העולם המשתפים את יצירותיהם.\n• אסתטיקה: התמונות מתאפיינות במראה 'אמנותי' ואיכותי במיוחד, מעולה למצגות השראה.\n• רקעים: תמונות בפורמט רחב המתאימות כרקעים למחשב או למצגות רחבות.\n• אוספים: אפשרות לחיפוש לפי קטגוריות נושאיות שנאצרו ע\"י עורכים (טבע, טכנולוגיה, אנשים).\n• שימוש חופשי: כל התמונות ניתנות להורדה ולשימוש ללא עלות וללא צורך במתן קרדיט (אם כי מומלץ)." },
        { id: 43, title: "Cymath", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1Cs8lKyCbSii0ZcE6OV3In1F-IgAX1Y_0/view?usp=sharing", siteUrl: "https://www.cymath.com", description: "פתרון בעיות מתמטיות צעד אחר צעד במגוון נושאי לימוד.", info: "• פתרון משוואות: תמיכה באלגברה, חדו\"א ונושאים מתקדמים.\n• הסברים שלב אחר שלב: הצגת דרך הפתרון המלאה כדי לסייע בהבנת התהליך.\n• ממשק ידידותי: הזנת נוסחאות בקלות באמצעות מקלדת מתמטית ייעודית.\n• כלי עזר ללמידה עצמית: מאפשר לתלמידים לבדוק את עצמם ולהבין טעויות בזמן אמת.\n• זמינות: עובד היטב בדפדפן ובאפליקציה לנייד." },
        { id: 44, title: "סימולטור Chemistry", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1XVcVQFyhKXxyqOcNtP-0WuhSEvQpT8km/view?usp=sharing", siteUrl: "https://interactives.ck12.org/simulations/chemistry.html", description: "סימולציות אינטראקטיביות בכימיה המאפשרות חקר של משתנים בסביבה וירטואלית.", info: "• חקר תופעות: ביצוע ניסויים וירטואליים בכימיה שקשה או מסוכן לבצע במעבדה.\n• אינטראקטיביות: שינוי משתנים וצפייה בתוצאות בזמן אמת להבנת קשרים סיבתיים.\n• המחשה ויזואלית: צפייה במודלים מולקולריים ותהליכים מיקרוסקופיים בצורה מרהיבה.\n• מגוון נושאים: מכסה נושאים כמו מצבי צבירה, תגובות כימיות, חומצות ובסיסים ועוד.\n• מותאם ללמידה: כולל שאלות מנחות ואתגרים להעמקת ההבנה של החומר הנלמד." },
        { id: 45, title: "סימולטור Physics", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1JdUbGhrJBrRMtjgsJAvmnFM7eIGppJXs/view?usp=sharing", siteUrl: "https://interactives.ck12.org/simulations/physics.html", description: "מגוון רחב של סימולציות פיזיקליות הממחישות חוקים ותופעות מהעולם האמיתי.", info: "• המחשת חוקי הפיזיקה: צפייה בגרפים ונתונים תוך כדי תנועה של עצמים בסימולציה.\n• ניסוי וטעייה: אפשרות לשנות פרמטרים כמו מסה, מהירות וכוח ולראות את ההשפעה המיידית.\n• עולם אמיתי: סימולציות המבוססות על תרחישים יומיומיים כמו נסיעה במכונית או שיגור רקטות.\n• כלים למורה: מצוין להדגמה פרונטלית בכיתה או כעבודת חקר עצמאית ומעמיקה לתלמידים.\n• אינטגרציה: ניתן לשלב בקלות בתוך מערכי שיעור דיגיטליים ודפי עבודה מקוונים." },
        { id: 46, title: "סימולטור קוביות תלת-מימדי", category: "סימולציות", driveUrl: "", siteUrl: "simulator-3d.html", description: "בניית מבנים מקוביות וסיבוב 360° לפיתוח קריאה במרחב תלת-מימדי.", info: "• בניית שכבות: המורה בונה מבנה תלת-מימדי שכבה אחר שכבה, עד לגובה בלתי מוגבל.\n• סיבוב 360°: גרירת המודל לכל כיוון לצפייה מכל זווית אפשרית.\n• צביעת קומות: כל קומה ניתנת לצביעה בצבע שונה לצורך הדגשה ויזואלית והוראה ברורה.\n• קריאה במרחב: פיתוח יכולת הדמיה מרחבית – זיהוי מבנים ממבטים עליון, קדמי ונסתר.\n• הדגמה פרונטלית: כלי אידיאלי לשיעורים במתמטיקה ובגיאומטריה תלת-מימדית." }
    ];
const grid = document.getElementById('presentationsGrid');
    const desktopFilterBar = document.getElementById('desktopFilterBar');
    const myChoicesContainer = document.getElementById('myChoicesContainer');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileCategoryLabel = document.getElementById('currentMobileCategory');

    let activeCategory = null;
    let searchQuery = '';

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-blue-mode');
            if (themeToggleBtn) themeToggleBtn.innerText = '🌙';
        } else {
            document.body.classList.remove('light-blue-mode');
            if (themeToggleBtn) themeToggleBtn.innerText = '☀️';
        }
    };

    window.toggleTheme = () => {
        const isLight = document.body.classList.contains('light-blue-mode');
        const newTheme = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'light' ? 'light' : 'dark');

    function hexToRgba(hex, opacity) { 
        let r = 0, g = 0, b = 0; 
        if (hex.length == 4) { r = "0x" + hex[1] + hex[1]; g = "0x" + hex[2] + hex[2]; b = "0x" + hex[3] + hex[3]; } 
        else if (hex.length == 7) { r = "0x" + hex[1] + hex[2]; g = "0x" + hex[3] + hex[4]; b = "0x" + hex[5] + hex[6]; } 
        return `rgba(${+r}, ${+g}, ${+b}, ${opacity})`; 
    }

    if (!window.userChoices) window.userChoices = [];

    window.toggleChoice = async function(id) {
        const idStr = String(id);
        const index = window.userChoices.indexOf(idStr);
        if (index > -1) window.userChoices.splice(index, 1);
        else window.userChoices.push(idStr);
        if (window.saveUserPreferences) await window.saveUserPreferences(window.userChoices);
        if (activeCategory === 'הבחירות שלי') renderPresentations();
        renderFilters(); // עדכון המונים בסינון
    };

    window.setFilter = function(category) { 
        activeCategory = category || null; 
        if (window.closeCategoryModal) window.closeCategoryModal();
        renderFilters(); 
        renderPresentations(); 
    };

    window.handleSearch = function() { 
        searchQuery = document.getElementById('searchInput').value.toLowerCase(); 
        renderPresentations(); 
    };

    function renderFilters() {
        const categories = Object.keys(categoryMap);
        const myChoicesCat = 'הבחירות שלי';
        const otherCategories = categories.filter(cat => cat !== myChoicesCat);

        // רינדור כפתור הבחירות שלי לשורה הנפרדת
        myChoicesContainer.innerHTML = `
            <button onclick="setFilter('${myChoicesCat}')" class="filter-btn ${activeCategory === myChoicesCat ? 'active-filter' : ''}">
                <span class="category-num-badge" style="background: ${categoryStyles[myChoicesCat].color}">${window.userChoices.length}</span>
                ${myChoicesCat}
            </button>
        `;

        // רינדור שאר הקטגוריות לסרגל המרכזי
        desktopFilterBar.innerHTML = otherCategories.map(cat => {
            const count = presentations.filter(p => p.category === cat).length;
            return `
            <button onclick="setFilter('${cat}')" class="filter-btn ${activeCategory === cat ? 'active-filter' : ''}">
                <span class="category-num-badge" style="background: ${categoryStyles[cat].color}">${count}</span>
                ${cat}
            </button>`;
        }).join('');
        
        if (mobileCategoryLabel) mobileCategoryLabel.innerText = activeCategory || "כל הקטגוריות";

        // מילוי רשימת הקטגוריות במודל הסלולר
        const mobileList = document.getElementById('mobileModalList');
        if (mobileList) {
            const allCategories = [
                { key: null,         label: 'כל הקטגוריות', color: '#3b82f6' },
                { key: myChoicesCat, label: myChoicesCat,    color: categoryStyles[myChoicesCat].color },
                ...otherCategories.map(cat => ({ key: cat, label: cat, color: (categoryStyles[cat] || categoryStyles['default']).color }))
            ];
            mobileList.innerHTML = allCategories.map(({ key, label, color }) => {
                const isActive = key === null ? !activeCategory : activeCategory === key;
                const count = key === null ? presentations.length
                    : key === myChoicesCat ? window.userChoices.length
                    : presentations.filter(p => p.category === key).length;
                const onclickVal = key === null ? 'null' : `'${key}'`;
                return `
                <button class="mobile-cat-btn ${isActive ? 'active-mobile-cat' : ''}"
                        onclick="setFilter(${onclickVal})">
                    <div class="mobile-cat-right">
                        <div class="mobile-cat-dot" style="background:${color}"></div>
                        <span>${label}</span>
                    </div>
                    <span class="mobile-cat-count">${count}</span>
                </button>`;
            }).join('');
        }
    }

    function renderPresentations() {
        if (!grid) return;
        let filtered = activeCategory === 'הבחירות שלי' ? presentations.filter(p => window.userChoices.includes(String(p.id))) : 
                       (activeCategory ? presentations.filter(p => p.category === activeCategory) : presentations);
        
        if (searchQuery) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));
        
        if (filtered.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center py-20 text-slate-500 font-bold">לא נמצאו כלים...</div>`;
            return;
        }

        grid.innerHTML = filtered.map(p => {
            const style = categoryStyles[p.category] || categoryStyles['default'];
            const isChecked = window.userChoices.includes(String(p.id)) ? 'checked' : '';
            const finalCenter = hexToRgba(style.color, 0.9);
            const finalEdge = hexToRgba(style.color, 0.45);

            return `
            <div class="card-3d p-8 flex flex-col justify-between" 
                 style="--category-color: ${style.color}; --card-gradient-center: ${finalCenter}; --card-gradient-edge: ${finalEdge}; --category-glow: ${style.color}40;">
                <div class="choice-checkbox-container">
                    <input type="checkbox" class="choice-checkbox" onchange="toggleChoice(${p.id})" ${isChecked}>
                </div>
                <div>
                    <div class="category-chip" style="border-right-color: ${style.color}">
                        <span class="category-num-badge" style="background: ${style.color}">${categoryMap[p.category] || 0}</span>
                        ${p.category}
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">${p.title}</h3>
                    <p class="text-white/90 mb-10 leading-relaxed">${p.description}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="openModal(${p.id})" class="yellow-action-btn py-3 px-2 text-xs font-bold">מידע</button>
                        <a href="${p.siteUrl}" target="_blank" class="yellow-action-btn py-3 px-2 text-xs font-bold text-center flex items-center justify-center">כניסה</a>
                    </div>
                    ${p.guideUrl ? `<a href="${p.guideUrl}" target="_blank" class="py-3 px-4 font-bold text-center text-[10px] tracking-wider border rounded" style="color: #fdba74; border-color: rgba(253, 186, 116, 0.5);">מדריך חשבון חינוך</a>` : ''}
                    ${p.driveUrl ? `<a href="${p.driveUrl}" target="_blank" class="bg-orange-600 hover:bg-orange-500 text-white py-3 px-4 text-center text-xs font-bold rounded shadow-lg">צפייה במצגת ההדרכה</a>` : ''}
                </div>
            </div>`;
        }).join('');
    }

    window.openModal = function(id) {
        const p = presentations.find(i => i.id === id);
        document.getElementById('modalTitle').innerText = p.title;
        document.getElementById('modalBody').innerText = p.info;
        document.getElementById('infoModal').style.display = 'flex';
    };
    window.closeModal = () => document.getElementById('infoModal').style.display = 'none';

    renderFilters();
    renderPresentations();
}
window.initDashboard = initDashboard;

// ===== פונקציות מודל הצעת כלים =====
window.openSuggestModal = function() {
    const overlay = document.getElementById('suggestModalOverlay');
    if (!overlay) return;
    // איפוס הטופס
    document.getElementById('suggestForm').style.display = 'block';
    document.getElementById('suggestThanks').style.display = 'none';
    document.getElementById('suggestText').value = '';
    document.getElementById('suggestCharCount').innerText = '0';
    overlay.style.display = 'flex';
};

window.closeSuggestModal = function() {
    const overlay = document.getElementById('suggestModalOverlay');
    if (overlay) overlay.style.display = 'none';
};

window.submitSuggestion = async function() {
    const text = document.getElementById('suggestText').value.trim();
    if (!text) return;
    const btn = document.querySelector('.suggest-submit-btn');
    btn.disabled = true;
    btn.innerText = 'שולח...';
    try {
        if (window.submitSuggestionToFirebase) {
            await window.submitSuggestionToFirebase(text);
        }
        document.getElementById('suggestForm').style.display = 'none';
        document.getElementById('suggestThanks').style.display = 'block';
        setTimeout(() => window.closeSuggestModal(), 3000);
    } catch(e) {
        console.error('Submit error:', e);
        alert('שגיאה: ' + (e.message || e.code || JSON.stringify(e)));
        btn.disabled = false;
        btn.innerText = 'שלח הצעה';
    }
};

// עדכון מונה תווים
document.addEventListener('DOMContentLoaded', () => {
    const ta = document.getElementById('suggestText');
    if (ta) ta.addEventListener('input', () => {
        document.getElementById('suggestCharCount').innerText = ta.value.length;
    });
});

// פונקציות מודל קטגוריות - גלובליות (נקראות מ-onclick לפני initDashboard)
window.openCategoryModal = function() {
    const overlay = document.getElementById('categoryModalOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    overlay.offsetHeight; // reflow לאנימציה
    overlay.classList.add('open');
};

window.closeCategoryModal = function() {
    const overlay = document.getElementById('categoryModalOverlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    overlay.classList.remove('open');
};
