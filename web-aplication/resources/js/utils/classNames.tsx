export default function (...args:string[]):string{
    return args.filter(Boolean).join(" ")
}
