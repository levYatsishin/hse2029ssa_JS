describe('Сценарий работы библиотеки', function () {
  it('находит, выдаёт и принимает обратно восстановленную книгу', function () {
    const library = new Library('Районная библиотека');
    const novel = new NovelBook('Автор романа', 'Роман 1919 года', 1919, 180);
    library.addBook(new Magazine('Литературный журнал', 2019, 60));
    library.addBook(new FantasticBook('Автор повести', 'Поездка на Марс', 2020, 120));
    library.addBook(novel);

    const foundBook = library.findBookBy('releaseDate', 1919);
    expect(foundBook).toBe(novel);

    const issuedBook = library.giveBookByName(foundBook.name);
    expect(issuedBook).toBe(novel);
    expect(library.findBookBy('releaseDate', 1919)).toBeNull();

    issuedBook.state = 30;
    library.addBook(issuedBook);
    expect(library.findBookBy('releaseDate', 1919)).toBeNull();

    issuedBook.fix();
    expect(issuedBook.state).toBe(45);
    library.addBook(issuedBook);
    expect(library.findBookBy('releaseDate', 1919)).toBe(novel);
    expect(library.books.length).toBe(3);
  });
});
