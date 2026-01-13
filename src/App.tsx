import { useState, useEffect } from 'react';
import { Plus, Minus, X, ShoppingBag, Heart } from 'lucide-react';

const MENU = {
  fastfood: [
    { id: 1, name: 'Классический Бургер', price: 1400, desc: 'Сочная говяжья котлета, свежие овощи, авторский соус', img: '/images/burger.jpg' },
    { id: 2, name: 'Double Burger', price: 1800, desc: 'Две котлеты, двойной сыр чеддер, маринованные огурцы', img: '/images/double_burger.jpg' },
    { id: 3, name: 'Лаваш Куриный', price: 1200, desc: 'Куриное филе, хрустящий картофель фри, фирменный соус', img: '/images/lavash.jpg' },
    { id: 8, name: 'Пицца Маргарита', price: 2300, desc: 'Сыр моцарелла, томаты, итальянские травы', img: '/images/pizza_m.jpg' },
    { id: 9, name: 'Пицца Мясная', price: 2800, desc: 'Говядина, колбаски, пепперони, соус барбекю', img: '/images/pizza_meat.jpg' },
    { id: 10, name: 'Фри + Соус', price: 700, desc: 'Хрустящий картофель фри с кетчупом', img: '/images/fries.jpg' },
  ],
  hot_meals: [
    { id: 16, name: 'Шурпа (Мясная)', price: 1300, desc: 'Наваристый бульон с мясом и овощами', img: '/images/shurpa.jpg' },
    { id: 17, name: 'Лагман Гуйру', price: 1800, desc: 'Традиционная тянутая лапша с обжаренным мясом', img: '/images/lagman.jpg' },
    { id: 18, name: 'Плов', price: 1500, desc: 'Узбекский плов из отборного риса и говядины', img: '/images/plov.jpg' },
    { id: 19, name: 'Бешпармак', price: 2200, desc: 'Домашнее тесто, сочная говядина и лук', img: '/images/besh.jpg' },
    { id: 20, name: 'Чумян Лагман', price: 1900, desc: 'Жареный лагман с овощами и мясом', img: '/images/chumyan.jpg' },
    { id: 21, name: 'Нарын', price: 1400, desc: 'Традиционное блюдо с мелко нарезанным мясом', img: '/images/naryn.jpg' },
    { id: 22, name: 'Жаркое', price: 1500, desc: 'Тушеное мясо с картофелем и специями', img: '/images/zharkoe.jpg' },
  ],
  salads: [
    { id: 27, name: 'Свежий', price: 1200, desc: 'Огурцы, помидоры, лук и зелень', img: '/images/fresh.jpg' },
    { id: 28, name: 'Ачучук', price: 1200, desc: 'Острый салат из томатов к плову', img: '/images/achuchuk.jpg' },
    { id: 29, name: 'Оливье', price: 1500, desc: 'Классический мясной салат', img: '/images/olivie.jpg' },
  ],
  drinks: [
    { id: 30, name: 'Coca-Cola 0.5L', price: 400, desc: 'Освежающий напиток', img: '/images/cola05.jpg' },
    { id: 31, name: 'Coca-Cola 1.0L', price: 600, desc: 'Освежающий напиток', img: '/images/cola1.jpg' },
    { id: 32, name: 'Fanta 0.5L', price: 400, desc: 'Освежающий напиток', img: '/images/fanta05.jpg' },
    { id: 33, name: 'Fanta 1.0L', price: 600, desc: 'Освежающий напиток', img: '/images/fanta1.jpg' },
    { id: 34, name: 'Fuse Tea 0.5L', price: 450, desc: 'Холодный чай', img: '/images/tea05.jpg' },
    { id: 35, name: 'Fuse Tea 1.0L', price: 650, desc: 'Холодный чай', img: '/images/tea1.jpg' },
    { id: 36, name: 'Gorilla Energy', price: 550, desc: 'Энергетический напиток', img: '/images/gorilla.jpg' },
    { id: 37, name: 'Dizzy', price: 500, desc: 'Газированный напиток', img: '/images/dizzy.jpg' },
    { id: 38, name: 'Айран', price: 300, desc: 'Кисломолочный напиток', img: '/images/ayran.jpg' },
    { id: 39, name: 'Вода 0.5L', price: 200, desc: 'Газированная или без газа', img: '/images/water05.jpg' },
    { id: 40, name: 'Вода 1.0L', price: 350, desc: 'Газированная или без газа', img: '/images/water1.jpg' },
    { id: 41, name: 'Кофе 0.3L', price: 500, desc: 'Натуральный кофе', img: '/images/coffee03.jpg' },
    { id: 42, name: 'Кофе 0.4L', price: 700, desc: 'Натуральный кофе', img: '/images/coffee04.jpg' },
    { id: 43, name: 'Чай 0.3L', price: 300, desc: 'Черный или зеленый', img: '/images/tea03.jpg' },
  ]
};

function App() {
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const [isTakeAway, setIsTakeAway] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#22c55e";
    document.body.style.overflow = showConfirmModal ? "hidden" : "auto";
  }, [showConfirmModal]);

  const addToCart = (p: any) => {
    setCart(curr => {
      const item = curr.find(i => i.id === p.id);
      return item ? curr.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...curr, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(curr => curr.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0));
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  return (
    <div className="w-full min-h-screen bg-[#22c55e] flex justify-center font-sans select-none overflow-x-hidden p-4">
      <div className="w-full max-w-[450px] flex flex-col relative pb-32">

        {/* HEADER */}
        <div className="flex flex-col items-center py-8">
          <h1 className="text-5xl font-black italic tracking-tighter text-black flex items-center">
            LIKE <Heart size={38} fill="#000" stroke="#000" className="ml-2" />
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/80 mt-2">Shymkent • Fast Food</p>
        </div>

        {/* TOGGLE */}
        <div className="mb-8 sticky top-2 z-40">
          <div className="flex w-full bg-white/20 backdrop-blur-md p-1 rounded-2xl border border-black/10 shadow-lg">
            <button onClick={() => setIsTakeAway(false)} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${!isTakeAway ? 'bg-black text-white shadow-xl' : 'text-black/50'}`}>В ЗАЛЕ</button>
            <button onClick={() => setIsTakeAway(true)} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${isTakeAway ? 'bg-black text-white shadow-xl' : 'text-black/50'}`}>С СОБОЙ</button>
          </div>
        </div>

        {/* MENU */}
        {Object.entries(MENU).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-black/60 pl-2">
              {category === 'fastfood' && '🔥 ФАСТ ФУД'}
              {category === 'hot_meals' && '🍲 ГОРЯЧЕЕ'}
              {category === 'salads' && '🥗 САЛАТЫ'}
              {category === 'drinks' && '🥤 НАПИТКИ'}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {items.map(item => {
                const cartItem = cart.find(i => i.id === item.id);
                return (
                  <div key={item.id} className="bg-white/95 backdrop-blur-sm rounded-[24px] border border-black/5 flex p-3 shadow-sm active:scale-[0.98] transition-transform">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5">
                      <img 
                        src={item.img} 
                        className="w-full h-full object-cover bg-gray-200" 
                        alt={item.name} 
                        onError={(e) => { e.currentTarget.style.display = 'none' }} 
                      />
                    </div>
                    <div className="ml-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-extrabold text-black uppercase leading-tight">{item.name}</h3>
                          <span className="text-xs font-black text-black ml-2">{item.price} ₸</span>
                        </div>
                        <p className="text-[10px] text-black/50 mt-1 leading-tight line-clamp-2">{item.desc}</p>
                      </div>
                      <div className="flex justify-end mt-2">
                        {cartItem ? (
                          <div className="flex items-center bg-black rounded-xl p-1">
                            <button onClick={() => removeFromCart(item.id)} className="p-1 text-white"><Minus size={14} strokeWidth={3} /></button>
                            <span className="px-3 text-xs font-bold text-white">{cartItem.qty}</span>
                            <button onClick={() => addToCart(item)} className="p-1 text-white"><Plus size={14} strokeWidth={3} /></button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(item)} className="bg-[#22c55e] border border-black/10 px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm">
                            Добавить
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* FLOATING ACTION BUTTON */}
        {cart.length > 0 && !showConfirmModal && (
          <div className="fixed bottom-8 left-0 right-0 z-[60] px-6 flex justify-center">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full max-w-[400px] bg-black text-white flex items-center justify-between p-4 rounded-3xl shadow-2xl border border-white/10 active:scale-95 transition-all"
            >
              <div className="flex flex-col items-start pl-2">
                <span className="text-[10px] text-white/40 font-bold uppercase">Мой заказ</span>
                <span className="text-xl font-black">{total} ₸</span>
              </div>
              <div className="bg-[#22c55e] text-black px-6 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-2">
                Оформить <ShoppingBag size={18} strokeWidth={3} />
              </div>
            </button>
          </div>
        )}

        {/* MODAL */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-[999] flex items-end justify-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowConfirmModal(false)}></div>
            <div className="relative w-full max-w-[500px] bg-[#0a0a0a] rounded-t-[40px] p-6 shadow-2xl flex flex-col max-h-[85vh] border-t border-white/10">
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6"></div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-black italic uppercase text-[#22c55e]">Ваш Заказ</h2>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{isTakeAway ? '🥡 На вынос' : '🍽 В заведении'}</p>
                </div>
                <button onClick={() => setShowConfirmModal(false)} className="bg-white/10 text-white p-2 rounded-full"><X size={20} /></button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-3 mb-6 pr-2">
                {cart.map(i => (
                  <div key={i.id} className="flex justify-between items-center bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05]">
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm uppercase">{i.name}</span>
                      <span className="text-[#22c55e] text-[10px] font-black">{i.qty} шт × {i.price} ₸</span>
                    </div>
                    <span className="text-white font-black">{i.price * i.qty} ₸</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#22c55e] p-5 rounded-3xl mb-4 flex justify-between items-center">
                <span className="text-black font-black uppercase text-[10px]">Итого:</span>
                <span className="text-black text-2xl font-black italic">{total} ₸</span>
              </div>

              <button
                onClick={() => {
                  const phone = "77471385078";
                  const text = `*LIKE FAST FOOD*\n*ТИП: ${isTakeAway ? 'С СОБОЙ' : 'В ЗАЛЕ'}*\n\n` +
                    cart.map(i => `• ${i.name} [x${i.qty}] = ${i.price * i.qty}₸`).join('\n') +
                    `\n\n*ИТОГО: ${total} ₸*`;
                  window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
                }}
                className="w-full bg-white text-black py-4 rounded-[20px] font-black uppercase text-sm shadow-xl active:scale-95 transition-all mb-2"
              >
                Отправить в WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;