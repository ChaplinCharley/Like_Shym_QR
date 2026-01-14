import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingBag, Heart } from "lucide-react";

// --- МЕНЮ ---
const MENU = {
  breakfasts: [
    { id: 1, name: 'Яйца жареные с сосисками', price: 1000, desc: 'Классический завтрак с яйцами и сосисками', img: '/images/breakfast_eggs.jpg' },
    { id: 2, name: 'Шакшука', price: 1200, desc: 'Яйца в томатном соусе с овощами', img: '/images/shakshuka.jpg' },
    { id: 3, name: 'Гренки с чесночным соусом', price: 800, desc: 'Хрустящие гренки с ароматным соусом', img: '/images/grenki.jpg' },
    { id: 4, name: 'Оладьи (сгущенка/сметана/джем)', price: 800, desc: '4 шт. на выбор с добавками', img: '/images/oladji.jpg' },
    { id: 5, name: 'Блинчики сытные (курица, грибы, фарш)', price: 1200, desc: 'Плотные блинчики с начинкой', img: '/images/blinchiki.jpg' },
    { id: 6, name: 'Блинчики сладкие (джем/сгущенка/творог)', price: 900, desc: 'Нежные сладкие блинчики', img: '/images/blinchiki_sweet.jpg' },
  ],
  salads: [
    { id: 10, name: 'Свежий салат', price: 1200, desc: 'Огурцы, помидоры, зелень', img: '/images/fresh.jpg' },
    { id: 11, name: 'Ачучук', price: 1200, desc: 'Пикантный восточный салат', img: '/images/achuchuk.jpg' },
    { id: 12, name: 'Оливье', price: 1500, desc: 'Классический салат оливье', img: '/images/olivie.jpg' },
  ],
  first_courses: [
    { id: 20, name: 'Шурпа (мясная)', price: 1300, desc: 'Наваристый бульон с мясом', img: '/images/shurpa.jpg' },
    { id: 21, name: 'Рассольник', price: 1300, desc: 'Горячий суп с огуречным рассолом', img: '/images/rassolnik.jpg' },
    { id: 22, name: 'Солянка', price: 1700, desc: 'Суп с колбасками и лимоном', img: '/images/solyanka.jpg' },
    { id: 23, name: 'Нарын', price: 1400, desc: 'Киргизское блюдо с лапшой и мясом', img: '/images/naryn.jpg' },
    { id: 24, name: 'Пельмени', price: 1400, desc: 'Пельмени домашние с бульоном', img: '/images/pelmeni.jpg' },
    { id: 25, name: 'Кукси', price: 1500, desc: 'Холодная лапша по-корейски', img: '/images/kuksi.jpg' },
  ],
  second_courses: [
    { id: 30, name: 'Лагман Гуйру', price: 1800, desc: 'Классический лагман с мясом и овощами', img: '/images/lagman.jpg' },
    { id: 31, name: 'Суйру лагман', price: 1700, desc: 'Домашний лагман с тянущейся лапшой', img: '/images/suyru_lagman.jpg' },
    { id: 32, name: 'Бифштекс', price: 1500, desc: 'Мясной бифштекс с гарниром', img: '/images/bifshteks.jpg' },
    { id: 33, name: 'Плов', price: 1500, desc: 'Традиционный узбекский плов', img: '/images/plov.jpg' },
    { id: 34, name: 'Гуляш', price: 1500, desc: 'Мясо в подливе, подаётся с гарниром', img: '/images/gulyash.jpg' },
    { id: 35, name: 'Цомян лагман', price: 1900, desc: 'Лапша с мясом и соусом', img: '/images/tsomyan.jpg' },
    { id: 36, name: 'Манты', price: 1500, desc: 'Сочные манты на пару', img: '/images/manty.jpg' },
    { id: 37, name: 'Бешбармак', price: 2200, desc: 'Национальное блюдо из теста и мяса', img: '/images/beshbarmak.jpg' },
    { id: 38, name: 'Жаркое', price: 1500, desc: 'Картофель с мясом в соусе', img: '/images/jarkoe.jpg' },
    { id: 39, name: 'Куырдак', price: 3500, desc: 'Обжаренные субпродукты с луком', img: '/images/kuyrdak.jpg' },
    { id: 40, name: 'Казан Кебаб', price: 3500, desc: 'Жареное мясо с картофелем', img: '/images/kazan_kebab.jpg' },
  ],
  fastfood: [
    { id: 50, name: 'Классический бургер', price: 1400, desc: 'Сочная котлета, овощи, соус', img: '/images/burger.jpg' },
    { id: 51, name: 'Double Burger', price: 1800, desc: 'Двойная котлета и сыр', img: '/images/double_burger.jpg' },
    { id: 52, name: 'Лаваш куриный', price: 1200, desc: 'Куриное филе и фирменный соус', img: '/images/lavash.jpg' },
    { id: 53, name: 'Лаваш грибной', price: 1300, desc: 'Грибы, овощи, соус', img: '/images/lavash_mushroom.jpg' },
    { id: 54, name: 'Веган лаваш', price: 1300, desc: 'Овощной лаваш без мяса', img: '/images/vegan_lavash.jpg' },
    { id: 55, name: 'Люля-кебаб', price: 1300, desc: 'Сочный люля в лаваше', img: '/images/lulya_kebab.jpg' },
  ],
  pizza: [
    { id: 60, name: 'Маргарита', price: 2300, desc: 'Моцарелла и томаты', img: '/images/pizza_m.jpg' },
    { id: 61, name: 'Сырная', price: 2300, desc: 'Много сыра!', img: '/images/pizza_cheese.jpg' },
    { id: 62, name: 'Салями', price: 2400, desc: 'Пикантная салями', img: '/images/pizza_salami.jpg' },
    { id: 63, name: 'Курица и грибы', price: 2500, desc: 'Курица, грибы, сыр', img: '/images/pizza_chicken.jpg' },
    { id: 64, name: 'Овощная', price: 2500, desc: 'Свежие овощи и сыр', img: '/images/pizza_veg.jpg' },
    { id: 65, name: 'Болоньеза', price: 2600, desc: 'Мясной соус болоньезе', img: '/images/pizza_bol.jpg' },
    { id: 66, name: 'Мясная', price: 2800, desc: 'Разные виды мяса и сыр', img: '/images/pizza_meat.jpg' },
  ],
  drinks: [
    { id: 70, name: 'Coca-Cola 0.5L', price: 400, desc: 'Освежающий напиток', img: '/images/cola05.jpg' },
    { id: 71, name: 'Coca-Cola 1L', price: 700, desc: 'Большая порция классической колы', img: '/images/cola1l.jpg' },
    { id: 72, name: 'Fanta 0.5L', price: 400, desc: 'Фанта апельсин', img: '/images/fanta05.jpg' },
    { id: 73, name: 'Fanta 1L', price: 700, desc: 'Фанта большая', img: '/images/fanta1l.jpg' },
    { id: 74, name: 'Fuse Tea 0.5L', price: 400, desc: 'Холодный чай', img: '/images/fuse05.jpg' },
    { id: 75, name: 'Fuse Tea 1L', price: 700, desc: 'Холодный чай большой', img: '/images/fuse1l.jpg' },
    { id: 76, name: 'Горилла', price: 500, desc: 'Энергетический напиток', img: '/images/gorilla.jpg' },
    { id: 77, name: 'Дизи', price: 500, desc: 'Энергетик DIZI', img: '/images/dizi.jpg' },
    { id: 78, name: 'Какао (мал.)', price: 400, desc: 'Маленький стакан какао', img: '/images/cocoa_s.jpg' },
    { id: 79, name: 'Какао (ср.)', price: 600, desc: 'Средний стакан какао', img: '/images/cocoa_m.jpg' },
    { id: 80, name: 'Кофе Латте (мал.)', price: 600, desc: 'Мягкий вкус латте', img: '/images/latte_s.jpg' },
    { id: 81, name: 'Кофе Латте (бол.)', price: 800, desc: 'Большой латте', img: '/images/latte_l.jpg' },
    { id: 82, name: 'Эспрессо (мал.)', price: 500, desc: 'Крепкий маленький кофе', img: '/images/espresso.jpg' },
    { id: 83, name: 'Капучино (мал.)', price: 600, desc: 'Воздушная пена', img: '/images/cappuccino_s.jpg' },
    { id: 84, name: 'Капучино (бол.)', price: 800, desc: 'Большая порция капучино', img: '/images/cappuccino_l.jpg' },
    { id: 85, name: 'Американо (мал.)', price: 600, desc: 'Классический кофе', img: '/images/americano_s.jpg' },
  ],
};

// --- Сердечки ---
const HeartDivider = () => (
  <div className="flex justify-center items-center w-full my-2 overflow-hidden select-none opacity-30">
    <div className="text-black text-[8px] tracking-[6px] whitespace-nowrap">
      ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
    </div>
  </div>
);

function App() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);
  const [isTakeAway, setIsTakeAway] = useState(false);
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (cat: string) =>
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));

  useEffect(() => {
    document.body.style.backgroundColor = "#22c55e";
  }, []);

  const addToCart = (p: any) => {
    setCart((curr) => {
      const item = curr.find((i) => i.id === p.id);
      return item
        ? curr.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...curr, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((curr) =>
      curr
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div className="w-full min-h-screen bg-[#22c55e] flex justify-center font-sans text-[13px] text-black select-none overflow-x-hidden p-4">
      <div className="w-full max-w-[450px] flex flex-col relative pb-32">
        
        {/* HEADER */}
        <div className="flex flex-col items-center py-6">
          <h1 className="text-5xl font-black italic tracking-tighter text-black flex items-center">
            LIKE <Heart size={38} fill="#000" stroke="#000" className="ml-2" />
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/80 mt-2">
            Shymkent • Fast Food
          </p>
        </div>

        {/* TOGGLE */}
        <div className="mb-5 sticky top-4 z-40">
          <div className="flex w-full bg-black p-1 rounded-2xl border border-black shadow-lg">
            <button
              onClick={() => setIsTakeAway(false)}
              className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                !isTakeAway ? "bg-[#22c55e] text-black shadow-md" : "bg-transparent text-[#22c55e]"
              }`}
            >
              В ЗАЛЕ
            </button>
            <button
              onClick={() => setIsTakeAway(true)}
              className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                isTakeAway ? "bg-[#22c55e] text-black shadow-md" : "bg-transparent text-[#22c55e]"
              }`}
            >
              С СОБОЙ
            </button>
          </div>
        </div>

        {/* КАТЕГОРИИ */}
        {Object.entries(MENU).map(([category, items]) => {
          const titles: Record<string, string> = {
            breakfasts: "🍳 Завтраки",
            salads: "🥗 Салаты",
            first_courses: "🥣 Первые блюда",
            second_courses: "🍛 Вторые блюда",
            pizza: "🍕 Пицца",
            fastfood: "🍔 Фастфуд",
            drinks: "🥤 Напитки",
          };
          const isOpen = openCategories[category];
          return (
            <div key={category} className="mb-2 last:mb-4">
              <button
                onClick={() => toggleCategory(category)}
                className="category-button w-full !bg-black !text-[#22c55e] font-black uppercase tracking-wide text-[14px] py-4 rounded-2xl flex justify-between items-center px-5 shadow-xl border border-[#22c55e]/40 hover:!bg-[#111] active:scale-95 hover:translate-y-[-2px] transition-all"
              >
                <span>{titles[category]}</span>
                <span className="text-xl">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="animate-fadeIn mt-2">
                  <HeartDivider />
                  {items.map((item) => {
                    const cartItem = cart.find((i) => i.id === item.id);
                    return (
                      <div key={item.id} className="mb-2">
                        <div className="bg-white rounded-[22px] p-3 flex gap-3 shadow-sm active:scale-[0.98] transition-all">
                          <div className="w-20 h-20 bg-gray-50 rounded-[18px] overflow-hidden flex-shrink-0">
                            <img
                              src={item.img}
                              className="w-full h-full object-cover"
                              alt={item.name}
                            />
                          </div>
                          <div className="flex flex-col flex-grow justify-between py-1">
                            <div>
                              <h3 className="text-[13px] font-black uppercase leading-tight">
                                {item.name}
                              </h3>
                              <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-tight font-medium">
                                {item.desc}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[13px] font-black">{item.price} ₸</span>
                              {cartItem ? (
                                <div className="flex items-center bg-black rounded-xl p-0.5">
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="w-7 h-7 flex items-center justify-center text-white"
                                  >
                                    <Minus size={12} strokeWidth={4} />
                                  </button>
                                  <span className="px-1 text-[11px] font-black text-white min-w-[18px] text-center">
                                    {cartItem.qty}
                                  </span>
                                  <button
                                    onClick={() => addToCart(item)}
                                    className="w-7 h-7 flex items-center justify-center text-white"
                                  >
                                    <Plus size={12} strokeWidth={4} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => addToCart(item)}
                                  className="bg-[#22c55e] text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase border border-black/5 active:bg-black active:text-white transition-all"
                                >
                                  Добавить
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <HeartDivider />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* КНОПКА ЗАКАЗА */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-0 right-0 z-[60] px-6 flex justify-center">
            <button
              onClick={() => {
                const phone = "77471385078";
                const text =
                  `*LIKE FAST FOOD*\n*ТИП: ${isTakeAway ? "С СОБОЙ 🥡" : "В ЗАЛЕ 🍽"}*\n\n` +
                  cart.map((i) => `• ${i.name} [x${i.qty}] = ${i.price * i.qty}₸`).join("\n") +
                  `\n\n*ИТОГО: ${total} ₸*`;
                window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
              }}
              className="w-full max-w-[420px] bg-black text-[#22c55e] flex items-center justify-between px-4 py-3 rounded-[26px] shadow-2xl border border-[#22c55e]/40 hover:bg-[#111] active:scale-95 transition-all"
            >
              <div className="flex flex-col items-start pl-2">
                <span className="text-[10px] text-[#22c55e]/70 font-bold uppercase tracking-widest">
                  К оплате
                </span>
                <span className="text-lg font-black">{total} ₸</span>
              </div>

              <div className="bg-[#22c55e] text-black px-6 py-3 rounded-[18px] font-black uppercase text-[11px] flex items-center gap-2 hover:scale-105 transition-transform">
                Заказать <ShoppingBag size={16} strokeWidth={3} />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;