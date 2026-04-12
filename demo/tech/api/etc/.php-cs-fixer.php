<?php

declare(strict_types=1);
use PhpCsFixer\Config;
use PhpCsFixer\Finder;
use PhpCsFixer\Runner\Parallel\ParallelConfigFactory;

return
    new Config()
        ->setCacheFile(__DIR__ . '/../var/cache/fixer/.php_cs')
        ->setParallelConfig(ParallelConfigFactory::detect())
        ->setFinder(
            Finder::create()
                ->in([
                    __DIR__ . '/../src',
                    __DIR__ . '/../tests',
                    __DIR__ . '/../public',
                ])
                ->exclude('fixtures')
                ->append([
                    __FILE__,
                ]),
        )
        ->setRiskyAllowed(true)
        ->setRules([
            // Основны правила
            '@PER-CS' => true,
            '@PER-CS:risky' => true,
            '@PHP8x5Migration' => true,
            '@PHP8x5Migration:risky' => true,
            '@PHPUnit11x0Migration:risky' => true,
            '@PhpCsFixer' => true,
            '@PhpCsFixer:risky' => true,
            // Сортировка импортов
            'ordered_imports' => ['imports_order' => ['class', 'function', 'const']],
            // Пробелы отключаем
            'concat_space' => ['spacing' => 'one'],
            // Пробелы отключаем
            'cast_spaces' => ['space' => 'none'],
            // Пробелы в бинарных операторах
            'binary_operator_spaces' => false,
            // Комментарии в phpdoc
            'phpdoc_to_comment' => false,
            // Пустая строка в phpdoc
            'phpdoc_separation' => false,
            // Сортировка phpdoc
            'phpdoc_types_order' => ['null_adjustment' => 'always_last'],
            // Выравнивание phpdoc
            'phpdoc_align' => false,
            // Перенос опретотора на след строку - false
            'operator_linebreak' => false,
            // Глобальный импорт всего
            'global_namespace_import' => ['import_classes' => true, 'import_functions' => true, 'import_constants' => true],
            // Пустая строку после конструкций - false
            'blank_line_before_statement' => false,
            // ; на этой же строке где и код
            'multiline_whitespace_before_semicolons' => ['strategy' => 'no_multi_line'],

            'fopen_flags' => ['b_mode' => true],
            // отключаем замену  assertEquals на assertSame
            'php_unit_strict' => false,
            // Аннотации типа @covers* - false
            'php_unit_test_class_requires_covers' => false,
            // Вызов объекта через self
            'php_unit_test_case_static_method_calls' => ['call_type' => 'self'],

            'yoda_style' => true,
            // Финальные классы
            'final_class' => true,
            // Абстрактный класс - финальный
            'final_public_method_for_abstract_class' => true,
            // Меняем на self
            'self_static_accessor' => true,
            // Функция со словом static
            'static_lambda' => true,
        ]);
