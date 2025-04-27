function upper(name) {
    return name.split('').map(ch => 
        /[a-z]/.test(ch) ? String.fromCharCode(ch.charCodeAt(0) - 32) : ch
    ).join('');
}

function countUncommonLetters(smaller, larger) {
    const Y = new Array(smaller.length + larger.length).fill(-1);
    let index = 0;
    let count = 0;

    for (let i = 0; i < smaller.length; i++) {
        if (smaller[i] === ' ') continue;
        for (let j = 0; j < larger.length; j++) {
            if (larger[j] === ' ') continue;
            if (smaller[i] === larger[j]) {
                let found = 0;
                for (let k = 0; k < Y.length; k++) {
                    if (Y[k] === -1) break;
                    if (j === Y[k]) {
                        found = 1;
                        break;
                    }
                }
                if (found === 0) {
                    count++;
                    Y[index] = j;
                    index++;
                    Y[index] = -1;
                    break;
                }
            }
        }
    }
    return (smaller.replace(/ /g, '').length + larger.replace(/ /g, '').length - count * 2);
}

function flames(diff) {
    const categories = ['F', 'L', 'A', 'M', 'E', 'S'];
    const eliminated = new Array(6).fill(0);
    let remaining = 6;
    let count = 0;
    let i = 0;

    while (remaining > 1) {
        if (eliminated[i] === 0) {
            count++;
            if (count === diff) {
                eliminated[i] = 1;
                count = 0;
                remaining--;
            }
        }
        i++;
        if (i >= 6) i = 0;
    }

    const final = eliminated.findIndex(val => val === 0);
    
    const result = {
        0: "FRIENDS 🤝",
        1: "LOVERS 💘",
        2: "AFFECTIONATE 🐥",
        3: "MARRIAGE 💍",
        4: "ENEMIES ⚔️",
        5: "SIBLING 👯‍♀️"
    };
    return result[final];
}

function calculateRelationship(event) {
    event.preventDefault();
    
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    errorDiv.textContent = '';
    resultDiv.textContent = '';

    if (name1.trim().toLowerCase() === name2.trim().toLowerCase()) {
        errorDiv.textContent = "The names are identical. Please enter two different names.";
        return;
    }

    const name1Upper = upper(name1);
    const name2Upper = upper(name2);

    const length1 = name1Upper.replace(/ /g, '').length;
    const length2 = name2Upper.replace(/ /g, '').length;

    let uncommon;
    if (length1 === length2) {
        uncommon = countUncommonLetters(name1Upper, name2Upper);
    } else if (length1 > length2) {
        uncommon = countUncommonLetters(name2Upper, name1Upper);
    } else {
        uncommon = countUncommonLetters(name1Upper, name2Upper);
    }

    if (uncommon === 0) {
        errorDiv.textContent = "No uncommon letters found, both names are identical.";
    } else {
        resultDiv.textContent = flames(uncommon);
    }
}