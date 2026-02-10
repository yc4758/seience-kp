// DOM 元素获取
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('back-to-top');
const lazyImages = document.querySelectorAll('.lazy-image');
const navItems = document.querySelectorAll('.nav-links a');

// 移动端菜单切换
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 返回顶部按钮显示/隐藏
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// 返回顶部功能
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动功能
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 关闭移动端菜单
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        
        const targetId = item.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 图片懒加载
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // 触发图片加载
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// 滚动触发动画
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// 为所有section添加动画效果
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// 资源卡片悬停效果
const resourceCards = document.querySelectorAll('.resource-card');
resourceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 窗口大小变化时的处理
window.addEventListener('resize', () => {
    // 确保在桌面视图下菜单是展开的
    if (window.innerWidth > 768) {
        navLinks.style.transform = 'translateY(0)';
        navLinks.style.opacity = '1';
    } else {
        // 在移动视图下关闭菜单
        if (!menuToggle.classList.contains('active')) {
            navLinks.style.transform = 'translateY(-150%)';
            navLinks.style.opacity = '0';
        }
    }
});

// 点击页面其他区域关闭移动端菜单
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !menuToggle.contains(e.target) && 
        !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});