/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from '@google/genai';
// Fix: Removed unused 'useMemo' and 'useEffect' imports.
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using a valid, shorter base64 string for the logo to prevent syntax errors.
const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFDSURBVHhe7dExAQAAAMKg9U/tbwagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4d08AAfyGu3QAAAABJRU5ErkJggg==';

// --- MOCK DATA ---
const initialProperties = [
    { id: 1, title: "BIỆT THỰ MINI SANG TRỌNG", price: "6.5 Tỷ", address: "Đường số 8, Phường 11, Quận Gò Vấp", specs: "4 PN, 5 WC, 80m²", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400", postedDate: "Đăng hôm nay", agent: { name: "Thảo Nguyễn", avatar: "https://i.pravatar.cc/150?img=1" } },
    { id: 2, title: "NHÀ PHỐ HIỆN ĐẠI, HẺM XE HƠI", price: "7.2 Tỷ", address: "Lê Văn Thọ, Phường 9, Quận Gò Vấp", specs: "5 PN, 6 WC, 95m²", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400", postedDate: "Đăng hôm qua", agent: { name: "Văn An", avatar: "https://i.pravatar.cc/150?img=2" } },
    { id: 3, title: "CĂN HỘ CAO CẤP QUẬN 2", price: "5.8 Tỷ", address: "Đường Trần Não, Phường An Khánh, Quận 2", specs: "3 PN, 2 WC, 110m²", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400", postedDate: "3 ngày trước", agent: { name: "Minh Hằng", avatar: "https://i.pravatar.cc/150?img=3" } },
    { id: 4, title: "NHÀ MẶT TIỀN KINH DOANH SẦM UẤT", price: "12 Tỷ", address: "Quang Trung, Phường 10, Quận Gò Vấp", specs: "6 PN, 7 WC, 120m²", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400", postedDate: "5 ngày trước", agent: { name: "Thảo Nguyễn", avatar: "https://i.pravatar.cc/150?img=1" } },
    { id: 5, title: "BIỆT THỰ SÂN VƯỜN THẢO ĐIỀN", price: "35 Tỷ", address: "Đường Nguyễn Văn Hưởng, Thảo Điền, Quận 2", specs: "5 PN, 6 WC, 350m²", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400", postedDate: "1 tuần trước", agent: { name: "Tuấn Kiệt", avatar: "https://i.pravatar.cc/150?img=4" } },
    { id: 6, title: "NHÀ PHỐ GIÁ RẺ QUẬN 12", price: "4.1 Tỷ", address: "Đường Hà Huy Giáp, Phường Thạnh Lộc, Quận 12", specs: "3 PN, 3 WC, 60m²", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400", postedDate: "1 tuần trước", agent: { name: "Lan Anh", avatar: "https://i.pravatar.cc/150?img=5" } },
];

const rentalProperties = [
    { id: 7, title: "CHO THUÊ CĂN HỘ MINI FULL NỘI THẤT", price: "8 Triệu/tháng", address: "Phan Xích Long, Quận Phú Nhuận", specs: "1 PN, 1 WC, 45m²", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400", postedDate: "Đăng hôm nay", agent: { name: "Hoàng Minh", avatar: "https://i.pravatar.cc/150?img=6" } },
    { id: 8, title: "CHO THUÊ NHÀ NGUYÊN CĂN GÒ VẤP", price: "15 Triệu/tháng", address: "Phạm Văn Chiêu, Phường 14, Gò Vấp", specs: "3 PN, 3 WC, 70m²", image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=400", postedDate: "2 ngày trước", agent: { name: "Thảo Nguyễn", avatar: "https://i.pravatar.cc/150?img=1" } },
];
// --- END MOCK DATA ---


type Property = {
    id: number;
    title: string;
    price: string;
    address: string;
    specs: string;
    image: string;
    postedDate: string;
    agent: {
        name: string;
        avatar: string;
    };
};

const Header = ({ onNavigate, currentPage }) => {
    return (
        <header className="app-header">
            <div className="container">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                    <img src={logoBase64} alt="Thảo Chốt Nhanh - Nhà An Tâm Logo" className="logo-image" />
                </a>
                <nav className="main-nav">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Mua Bán</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('rent'); }}>Cho Thuê</a>
                </nav>
                <button className="post-listing-btn" onClick={() => onNavigate('post')}>Đăng Tin</button>
            </div>
        </header>
    );
};

const PropertyListItem = ({ property }: { property: Property }) => {
    return (
        <div className="property-list-item">
            <div className="property-list-item-image">
                <img src={property.image} alt={property.title} />
            </div>
            <div className="property-list-item-info">
                <h3><a href="#">{property.title}</a></h3>
                <div className="property-price">{property.price}</div>
                <div className="property-address">{property.address}</div>
                <div className="property-specs">{property.specs}</div>
                <div className="property-posted-date">{property.postedDate}</div>
            </div>
            <div className="property-list-item-agent">
                <img src={property.agent.avatar} alt={property.agent.name} className="agent-avatar" />
                <div className="agent-name">{property.agent.name}</div>
                <button className="agent-contact-btn phone">Gọi điện</button>
                <button className="agent-contact-btn">Chat</button>
            </div>
        </div>
    );
};

const Sidebar = ({ pageType = 'buy' }) => {
    const [aiQuery, setAiQuery] = useState('');
    const [aiAnswer, setAiAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isRentPage = pageType === 'rent';

    const handleAskAI = async (e) => {
        e.preventDefault();
        if (!aiQuery) return;
        setIsLoading(true);
        setAiAnswer('');
        try {
            const prompt = `Bạn là một chuyên gia bất động sản, phong thủy và luật đất đai tại TP.HCM. Trả lời câu hỏi sau một cách ngắn gọn, chuyên nghiệp và hữu ích cho người đang tìm mua nhà: "${aiQuery}"`;
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt
            });
            setAiAnswer(response.text);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setAiAnswer("Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <aside className="sidebar">
            <div className="widget search-widget">
                <h2>{isRentPage ? 'Tìm kiếm nhà cho thuê' : 'Tìm kiếm nhà đất'}</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="city">Tỉnh / Thành phố</label>
                        <select id="city" className="form-control"><option>TP. Hồ Chí Minh</option></select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="district">Quận / Huyện</label>
                        <select id="district" className="form-control"><option>Quận Gò Vấp</option></select>
                    </div>
                    <div className="form-group price-range">
                        <label>Khoảng giá</label>
                        <div className="price-inputs">
                            <input type="number" placeholder={isRentPage ? "Từ (triệu)" : "Từ (tỷ)"} className="form-control" />
                            <span>-</span>
                            <input type="number" placeholder={isRentPage ? "Đến (triệu)" : "Đến (tỷ)"} className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="search-button">Tìm Kiếm</button>
                </form>
            </div>

            <div className="widget ai-guide">
                <h2>Chuyên Gia AI Nhà Đất</h2>
                <p>Hỏi bất cứ điều gì về khu vực, phong thủy, pháp lý...</p>
                <form onSubmit={handleAskAI}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            rows={3}
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            placeholder="Ví dụ: 'Phong thủy cho người mệnh Thủy' hoặc 'Thủ tục sang tên sổ đỏ'..."
                        ></textarea>
                    </div>
                    <button type="submit" className="search-button" disabled={isLoading}>
                        {isLoading ? <div className="spinner-small"></div> : 'Hỏi Chuyên Gia'}
                    </button>
                </form>
                {isLoading && <div className="loader"><div className="spinner"></div></div>}
                {aiAnswer && <div className="ai-answer">{aiAnswer}</div>}
            </div>

            <div className="widget category-widget">
                <h2>Danh mục theo giá</h2>
                 <ul>
                    {isRentPage ? (
                        <>
                            <li><a href="#">Dưới 5 triệu</a></li>
                            <li><a href="#">Từ 5 - 10 triệu</a></li>
                            <li><a href="#">Từ 10 - 20 triệu</a></li>
                            <li><a href="#">Trên 20 triệu</a></li>
                        </>
                    ) : (
                        <>
                            <li><a href="#">Dưới 3 tỷ</a></li>
                            <li><a href="#">Từ 3 - 5 tỷ</a></li>
                            <li><a href="#">Từ 5 - 7 tỷ</a></li>
                            <li><a href="#">Trên 7 tỷ</a></li>
                        </>
                    )}
                </ul>
            </div>
             <div className="widget category-widget">
                <h2>Danh mục theo Quận/Huyện</h2>
                <ul>
                    <li><a href="#">Quận Gò Vấp</a></li>
                    <li><a href="#">Quận 12</a></li>
                    <li><a href="#">Quận Tân Bình</a></li>
                    <li><a href="#">Quận Phú Nhuận</a></li>
                </ul>
            </div>
        </aside>
    );
};

const HomePage = () => {
    return (
         <main className="page-container container">
            <div className="listings-container">
                <header className="listings-header">
                    <h1>Nhà đất Gò Vấp nổi bật</h1>
                </header>
                <div className="property-list">
                    {initialProperties.map(prop => <PropertyListItem key={prop.id} property={prop} />)}
                </div>
            </div>
            <Sidebar pageType="buy" />
        </main>
    )
}

const ForRentPage = () => {
     return (
         <main className="page-container container">
            <div className="listings-container">
                <header className="listings-header">
                    <h1>Nhà đất cho thuê nổi bật</h1>
                </header>
                <div className="property-list">
                    {rentalProperties.map(prop => <PropertyListItem key={prop.id} property={prop} />)}
                </div>
            </div>
            <Sidebar pageType="rent" />
        </main>
    )
}

const PostListingPage = () => {
    return (
        <main className="container">
            <div className="post-listing-page">
                <h1>Đăng Tin Mua Bán / Cho Thuê</h1>
                <form>
                    <section className="form-section">
                        <h2>Thông tin cơ bản</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="listing-type">Loại hình<span className="required">*</span></label>
                                <select id="listing-type" className="form-control">
                                    <option>Nhà bán</option>
                                    <option>Nhà cho thuê</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="property-type">Loại BĐS<span className="required">*</span></label>
                                <select id="property-type" className="form-control">
                                    <option>Nhà phố</option>
                                    <option>Căn hộ chung cư</option>
                                    <option>Biệt thự</option>
                                    <option>Đất nền</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Tỉnh/Thành phố<span className="required">*</span></label>
                                <select id="city" className="form-control"><option>TP. Hồ Chí Minh</option></select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="district">Quận/Huyện<span className="required">*</span></label>
                                <select id="district" className="form-control"><option>Quận Gò Vấp</option></select>
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="address">Địa chỉ chi tiết<span className="required">*</span></label>
                                <input type="text" id="address" className="form-control" placeholder="Nhập số nhà, tên đường, phường/xã..."/>
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>Thông tin bài đăng</h2>
                        <div className="form-grid">
                           <div className="form-group">
                                <label htmlFor="listing-title">Tiêu đề<span className="required">*</span></label>
                                <input type="text" id="listing-title" className="form-control" placeholder="Ví dụ: Bán nhà hẻm xe hơi P.11 Gò Vấp" />
                            </div>
                             <div className="form-group">
                                <label htmlFor="price">Mức giá<span className="required">*</span></label>
                                <div className="price-input-group">
                                    <input type="number" id="price" className="form-control" placeholder="Nhập giá" />
                                    <select className="form-control price-unit">
                                        <option>Tỷ</option>
                                        <option>Triệu</option>
                                    </select>
                                </div>
                            </div>
                             <div className="form-group full-width">
                                <label htmlFor="listing-description">Nội dung mô tả<span className="required">*</span></label>
                                <textarea
                                    className="form-control"
                                    id="listing-description"
                                    rows={10}
                                    minLength={40}
                                    placeholder="Mô tả chi tiết về bất động sản, vị trí, tiện ích, tình trạng pháp lý..."
                                ></textarea>
                            </div>
                        </div>
                    </section>
                    
                    <section className="form-section">
                        <h2>Hình ảnh & Video</h2>
                         <div className="form-group">
                            <label>Chọn ảnh, video</label>
                            <input type="file" className="form-control" multiple accept="image/*,video/*" />
                        </div>
                    </section>

                    <div className="form-actions">
                        <button type="submit" className="submit-listing-btn">Đăng Tin Ngay</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Thảo Chốt Nhanh - Nhà An Tâm. All rights reserved.</p>
            </div>
        </footer>
    );
};


const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'rent':
                return <ForRentPage />;
            case 'post':
                return <PostListingPage />;
            default:
                return <HomePage />;
        }
    }

    return (
        <div>
            <Header onNavigate={setCurrentPage} currentPage={currentPage} />
            {renderPage()}
            <Footer />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);