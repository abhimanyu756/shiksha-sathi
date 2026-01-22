export default function Card({
    children,
    className = '',
    hover = false,
    padding = 'md',
    onClick,
    ...props
}) {
    const paddingSizes = {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
        xl: 'p-8',
    };

    return (
        <div
            className={`
        bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-slate-100 overflow-hidden
        ${hover ? 'hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
        ${paddingSizes[padding]}
        ${className}
      `}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
}
